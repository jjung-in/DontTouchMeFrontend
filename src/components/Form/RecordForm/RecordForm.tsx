import { useNavigate, useParams } from 'react-router-dom';
import { TEventDetailResponse } from '@_types/events.type';
import { TCreateRecordRequest, TRecordItem, TUpdateRecordRequest } from '@_types/records.type';
import * as S from './RecordForm.styles';
import required from '@_assets/images/required.png';
import CustomSelect from '@_components/Select/CustomSelect/CustomSelect';
import { downloadExcelTemplate } from '@_api/excel';
import { downloadBlobFile } from '@_utils/downloadFile';
import { formatNumber, getRecordGridTemplate, recordFieldConfig, recordReadConfig } from '@_utils/records';
import React, { useState } from 'react';
import { useDeleteRecord, useUpdateRecord } from '@_hooks/useRecords';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';
import TagSelect from '@_components/Select/TagSelect/TagSelect';

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
                              value={typeof value === 'string' || typeof value === 'number' ? value : ''}
                              onChange={(val) => handleUpdateChange(type, val.toString())}
                              isShowArrow={true}
                              isInput={type === 'price' && true}
                              isPrice={type === 'price' && true}
                            />
                          </S.GridCell>
                        );
                      }

                      if (element === 'text') {
                        return (
                          <S.GridCell key={key}>
                            <S.Input
                              type="text"
                              value={value ?? ''}
                              onChange={(e) => handleUpdateChange(type, e.target.value)}
                              maxLength={type === 'contact' ? 20 : 10}
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
                            <S.Text>
                              {config.type === 'price' && typeof value === 'number' ? formatNumber(value) : value}
                            </S.Text>
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
                        <S.Button
                          onClick={() => handleUpdateRecord(record)}
                          $textColor={updatedRecordId === recordId ? '#3959a5' : '#ffffff'}
                          $bgColor={updatedRecordId === recordId ? '#ffffff' : '#3959a5'}
                          $borderColor="#3959a5"
                        >
                          {updatedRecordId === recordId ? '저장' : '수정'}
                        </S.Button>
                      </S.GridCell>
                      <S.GridCell key={`row-${recordId}-delete`}>
                        <S.Button
                          onClick={() => {
                            setDeletedRecordId(recordId);
                            setIsDeleteModalOpen(true);
                          }}
                          $textColor="#ffffff"
                          $bgColor="#3959a5"
                          $borderColor="#3959a5"
                        >
                          삭제
                        </S.Button>
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
                            isShowArrow={type === 'type' || (type === 'target' && true)}
                            isInput={type === 'price' && true}
                            isPrice={type === 'price' && true}
                          />
                        </S.GridCell>
                      );
                    }

                    if (element === 'text') {
                      return (
                        <S.GridCell key={key}>
                          <S.Input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange?.(rowId, type, e.target.value)}
                            maxLength={type === 'contact' ? 20 : 10}
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
                      <S.Button
                        onClick={() => handleAddRow()}
                        $textColor="#ffffff"
                        $bgColor="#3959a5"
                        $borderColor="#3959a5"
                      >
                        추가
                      </S.Button>
                    ) : (
                      <S.Button onClick={() => handleDeleteRow(row.id)} $borderColor="#b4b9c9">
                        삭제
                      </S.Button>
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
          <S.LinkButton to={`/events/${eventId}`} $textColor="#3959a5" $borderColor="#3959a5">
            이전
          </S.LinkButton>
          <S.LinkButton
            to={`/events/${eventId}/records/create`}
            $textColor="#ffffff"
            $borderColor="#3959a5"
            $bgColor="#3959a5"
          >
            등록
          </S.LinkButton>
          <S.LinkButton
            to={`/events/${eventId}/records/update`}
            $textColor="#ffffff"
            $borderColor="#3959a5"
            $bgColor="#3959a5"
          >
            수정
          </S.LinkButton>
          <S.Button $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            엑셀 다운로드
          </S.Button>
          <S.LinkButton to={`/events/${eventId}/card`} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            감사장 전송
          </S.LinkButton>
        </S.ButtonArea>
      )}
      {mode === 'create' && (
        <S.ButtonArea>
          <S.Button onClick={handleBack} $textColor="#3959a5" $borderColor="#3959a5">
            이전
          </S.Button>
          <S.Button onClick={handleDownloadExcel} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            엑셀 양식 다운로드
          </S.Button>
          <S.Button $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            엑셀 업로드
          </S.Button>
          <S.Button onClick={handleSubmit} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            저장
          </S.Button>
        </S.ButtonArea>
      )}
      {mode === 'update' && (
        <S.ButtonArea>
          <S.LinkButton to={`/events/${eventId}/records`} $textColor="#3959a5" $borderColor="#3959a5">
            완료
          </S.LinkButton>
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
