import { useNavigate, useParams } from 'react-router-dom';
import { TEventDetailResponse } from '@_types/events.type';
import { TCreateRecordRequest, TRecordItem, TUpdateRecordRequest } from '@_types/records.type';
import * as S from './RecordForm.styles';
import required from '@_assets/images/required.png';
import CustomSelect from '@_components/Common/CustomSelect/CustomSelect';
import { downloadExcelTemplate, exportExcelFile, importExcelFile } from '@_api/excel';
import { downloadBlobFile } from '@_utils/excel.ts';
import { formatNumber, getRecordGridTemplate, recordFieldConfig, recordReadConfig } from '@_utils/records';
import React, { useState } from 'react';
import { useDeleteRecord, useUpdateRecord } from '@_hooks/useRecords';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';
import TagSelect from '@_components/Common/TagSelect/TagSelect';
import { isExcelFile } from '@_utils/excel';
import { Link } from 'react-router-dom';
import Button from '@_components/Common/Button/Button';
import Input from '@_components/Common/Input/Input';

interface Props {
  mode: 'create' | 'update' | 'read';
  event: TEventDetailResponse;
  records?: TRecordItem[];
  rows?: { id: number; values: TCreateRecordRequest }[];
  setRows?: React.Dispatch<React.SetStateAction<{ id: number; values: TCreateRecordRequest }[]>>;
  handleSubmit?: () => void;
  handleChange?: (id: number, key: keyof TCreateRecordRequest, value: string | number | string[] | null) => void;
}

const RecordForm = ({ mode, event, records, rows, setRows, handleSubmit, handleChange }: Props) => {
  const navigate = useNavigate();
  const eventId = Number(useParams().eventId);
  const { mutate: deleteRecord } = useDeleteRecord(eventId);
  const { mutate: updateRecord } = useUpdateRecord(eventId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedRecordId, setDeletedRecordId] = useState<number | null>(null);
  const [updatedRecordId, setUpdatedRecordId] = useState<number | null>(null);
  const [updatedValue, setUpdateValue] = useState<TUpdateRecordRequest | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddRow = () => {
    setRows?.((prev) => [
      ...prev,
      {
        id: Date.now(),
        values: {
          eventId: eventId,
          type: '입금',
          history: '',
          price: '',
          name: '',
          tags: [],
          imageUrl: '',
          target: '',
          contact: '',
        },
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setRows?.((prev) => prev.filter((row) => row.id !== id));
  };

  const handleUpdateChange = <K extends keyof TUpdateRecordRequest>(key: K, value: TUpdateRecordRequest[K]) => {
    setUpdateValue((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleUpdateRecord = (record: TRecordItem) => {
    if (updatedRecordId === record.eventDetailId && updatedValue) {
      // 유효성 검사
      updateRecord({ recordId: record.eventDetailId, recordData: updatedValue });
      setUpdatedRecordId(null);
    } else {
      setUpdatedRecordId(record.eventDetailId);
      setUpdateValue({
        type: record.type,
        history: record.history,
        price: record.price,
        name: record.name,
        tags: record.tags,
        imageUrl: record.image,
        target: record.target,
        contact: record.contact,
      });
    }
  };

  const handleDeleteRecord = (recordId: number) => {
    deleteRecord(
      { recordId },
      {
        onSuccess: () => {},
      },
    );
    setIsDeleteModalOpen(false);
  };

  const handleDownloadExcel = async () => {
    try {
      const data = await downloadExcelTemplate(eventId);
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      downloadBlobFile(blob, 'PAYble_template.xlsx');
    } catch {
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!isExcelFile(selectedFile)) {
      alert('엑셀 파일만 업로드할 수 있습니다.');
      e.target.value = '';
      return;
    }

    try {
      await importExcelFile(eventId, selectedFile);
      alert('엑셀 데이터가 성공적으로 업로드되었습니다!');
      navigate(`/events/${eventId}/records`);
    } catch (error) {
      alert('엑셀 업로드 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      e.target.value = '';
    }
  };

  const handleExcelExport = async () => {
    try {
      const data = await exportExcelFile(eventId);
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      downloadBlobFile(blob, `PAYble_${eventId}.xlsx`);
    } catch {
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {/* 폼 영역 */}
      {mode !== 'create' && records ? (
        <S.Grid $gridTemplateColumns={getRecordGridTemplate(mode, event.eventInfoItems)}>
          <>
            {event.eventInfoItems.map((item) =>
              item === '감사장' ? (
                <S.GridCell key={`header-${item}`} $isHeader>
                  {event.sendType === 'EMAIL' ? '이메일' : '연락처'}
                </S.GridCell>
              ) : (
                <S.GridCell key={`header-${item}`} $isHeader>
                  {recordReadConfig[item].label || item}
                  {recordReadConfig[item].required && <img src={required} alt="필수 입력" />}
                </S.GridCell>
              ),
            )}
            {mode === 'update' && (
              <>
                <S.GridCell $isHeader />
                <S.GridCell $isHeader />
              </>
            )}
          </>
          <>
            {records.map((record) => {
              const recordId = record.eventDetailId;
              const isEditing = recordId === updatedRecordId;
              return (
                <React.Fragment key={recordId}>
                  {event.eventInfoItems.map((item) => {
                    const key = `${recordId}-${item}`;
                    const config = recordReadConfig[item];

                    if (!config) {
                      return <S.GridCell key={key}>-</S.GridCell>;
                    }

                    const type = config.type;
                    const element = config.element;
                    const value = isEditing && updatedValue ? updatedValue[type] : record[type];

                    if (isEditing) {
                      if (element === 'select') {
                        return (
                          <S.GridCell key={key}>
                            <CustomSelect
                              options={(type === 'target' ? ['', ...event.targets] : config.options) || []}
                              value={
                                typeof value === 'string' || typeof value === 'number' || typeof value === 'string'
                                  ? value
                                  : ''
                              }
                              onChange={(val) => handleUpdateChange(type, val.toString())}
                              isShowArrow={type === 'type' || type === 'target'}
                              isInput={type === 'price' && true}
                              isPrice={type === 'price' && true}
                            />
                          </S.GridCell>
                        );
                      }

                      if (element === 'text') {
                        return (
                          <S.GridCell key={key}>
                            <Input
                              type="text"
                              value={value ?? ''}
                              onChange={(e) => handleUpdateChange(type, e.target.value)}
                              maxLength={type === 'contact' ? 20 : 10}
                              formType="record"
                            />
                          </S.GridCell>
                        );
                      }

                      if (element === 'tagSelect') {
                        return (
                          <S.GridCell key={key}>
                            <TagSelect
                              options={type === 'tags' ? event.tags : []}
                              value={Array.isArray(value) ? value : []}
                              onChange={(val) => handleUpdateChange(type, val)}
                            />
                          </S.GridCell>
                        );
                      }
                    } else {
                      if (element !== 'tagSelect') {
                        return (
                          <S.GridCell key={key}>
                            <Input as="span" variant="recordtext" fullWidth={true}>
                              {config.type === 'price' && (typeof value === 'number' || typeof value === 'string')
                                ? formatNumber(value)
                                : value}
                            </Input>
                          </S.GridCell>
                        );
                      }

                      if (element === 'tagSelect') {
                        return (
                          <S.GridCell key={key}>
                            <TagSelect options={[]} value={Array.isArray(value) ? value : []} isReadOnly={true} />
                          </S.GridCell>
                        );
                      }
                    }

                    return <S.GridCell key={key}>-</S.GridCell>;
                  })}
                  {mode === 'update' && (
                    <>
                      <S.GridCell key={`row-${recordId}-update`}>
                        <Button
                          onClick={() => handleUpdateRecord(record)}
                          variant={updatedRecordId === recordId ? 'secondary' : 'primary'}
                        >
                          {updatedRecordId === recordId ? '저장' : '수정'}
                        </Button>
                      </S.GridCell>
                      <S.GridCell key={`row-${recordId}-delete`}>
                        <Button
                          onClick={() => {
                            setDeletedRecordId(recordId);
                            setIsDeleteModalOpen(true);
                          }}
                          variant="primary"
                        >
                          삭제
                        </Button>
                      </S.GridCell>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </>
        </S.Grid>
      ) : (
        <S.Grid $gridTemplateColumns={getRecordGridTemplate(mode, event.eventInfoItems)}>
          <>
            {event.eventInfoItems.map((item) =>
              item === '감사장' ? (
                <S.GridCell key={`header-${item}`} $isHeader>
                  {event.sendType === 'EMAIL' ? '이메일' : '연락처'}
                </S.GridCell>
              ) : (
                <S.GridCell key={`header-${item}`} $isHeader>
                  {recordReadConfig[item]?.label || item}
                  {recordReadConfig[item]?.required && <img src={required} alt="필수 입력" />}
                </S.GridCell>
              ),
            )}
            <S.GridCell $isHeader />
          </>
          <>
            {rows?.map((row, index) => {
              const rowId = row.id;
              return (
                <React.Fragment key={rowId}>
                  {event.eventInfoItems.map((item) => {
                    const key = `${rowId}-${item}`;
                    const config = recordFieldConfig[item];

                    if (!config) {
                      return <S.GridCell key={key}>-</S.GridCell>;
                    }

                    const type = config.type;
                    const element = config.element;
                    const value = row.values[type];

                    if (element === 'select') {
                      return (
                        <S.GridCell key={key}>
                          <CustomSelect
                            options={(type === 'target' ? ['', ...event.targets] : config.options) || []}
                            value={typeof value === 'string' ? value : ''}
                            onChange={(val) => handleChange?.(rowId, type, val)}
                            isShowArrow={type === 'type' || type === 'target'}
                            isInput={type === 'price' && true}
                            isPrice={type === 'price' && true}
                          />
                        </S.GridCell>
                      );
                    }

                    if (element === 'text') {
                      return (
                        <S.GridCell key={key}>
                          <Input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange?.(rowId, type, e.target.value)}
                            maxLength={type === 'contact' ? 20 : 10}
                            formType="record"
                          />
                        </S.GridCell>
                      );
                    }

                    if (element === 'tagSelect') {
                      return (
                        <S.GridCell key={key}>
                          <TagSelect
                            options={type === 'tags' ? event.tags : []}
                            value={Array.isArray(value) ? value : []}
                            onChange={(val) => handleChange?.(rowId, type, val)}
                          />
                        </S.GridCell>
                      );
                    }

                    return <S.GridCell key={key}>-</S.GridCell>;
                  })}
                  <S.GridCell key={`row-${rowId}-action`}>
                    {index === 0 ? (
                      <Button onClick={() => handleAddRow()} variant="primary">
                        추가
                      </Button>
                    ) : (
                      <Button onClick={() => handleDeleteRow(row.id)} variant="default">
                        삭제
                      </Button>
                    )}
                  </S.GridCell>
                </React.Fragment>
              );
            })}
          </>
        </S.Grid>
      )}
      {/* 버튼 영역 */}
      {mode === 'read' && (
        <S.ButtonArea>
          <Button as={Link} to={`/events/${eventId}`} variant="secondary" fontWeight="semibold">
            이전
          </Button>
          <Button as={Link} to={`/events/${eventId}/records/create`} variant="primary" fontWeight="semibold">
            등록
          </Button>
          <Button as={Link} to={`/events/${eventId}/records/update`} variant="primary" fontWeight="semibold">
            수정
          </Button>
          <Button onClick={handleExcelExport} variant="primary" fontWeight="semibold">
            엑셀 다운로드
          </Button>
          <Button as={Link} to={`/events/${eventId}/card`} variant="primary" fontWeight="semibold">
            감사장 전송
          </Button>
        </S.ButtonArea>
      )}
      {mode === 'create' && (
        <S.ButtonArea>
          <Button onClick={handleBack} variant="secondary" fontWeight="semibold">
            이전
          </Button>
          <Button onClick={handleDownloadExcel} variant="primary" fontWeight="semibold">
            엑셀 양식 다운로드
          </Button>
          <label htmlFor="excel-upload">
            <Button as="p" variant="primary" fontWeight="semibold">
              엑셀 업로드
            </Button>
          </label>
          <input
            type="file"
            id="excel-upload"
            accept=".xls,.xlsx"
            onChange={handleExcelImport}
            style={{ display: 'none' }}
          />
          <Button onClick={handleSubmit} variant="primary" fontWeight="semibold">
            저장
          </Button>
        </S.ButtonArea>
      )}
      {mode === 'update' && (
        <S.ButtonArea>
          <Button as={Link} to={`/events/${eventId}/records`} variant="secondary" fontWeight="semibold">
            완료
          </Button>
        </S.ButtonArea>
      )}
      {/* 삭제 모달 */}
      {isDeleteModalOpen && deletedRecordId !== null && (
        <AlertModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="입출금 내역 삭제"
          message="확인 클릭 시 입출금 내역이 영구 삭제됩니다. 진행하시겠습니까?"
          onConfirm={() => handleDeleteRecord(deletedRecordId)}
        />
      )}
    </>
  );
};

export default RecordForm;
