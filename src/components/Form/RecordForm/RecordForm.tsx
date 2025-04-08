import { useParams } from 'react-router-dom';
import { TEventDetailResponse } from '@_types/events.type';
import { TCreateRecordRequest, TRecordItem, TUpdateRecordRequest } from '@_types/records.type';
import * as S from './RecordForm.styles';
import required from '@_assets/images/required.png';
import CustomSelect from '@_components/Select/CustomSelect/CustomSelect';
import { downloadExcelTemplate } from '@_api/excel';
import { downloadBlobFile } from '@_utils/downloadFile';
import { formatNumber, getRecordGridTemplate, recordFieldConfig, recordReadConfig } from '@_utils/records';
import { useState } from 'react';
import { useDeleteRecord, useUpdateRecord } from '@_hooks/useRecords';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';

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
  const eventId = Number(useParams().eventId);
  const { mutate: deleteRecord } = useDeleteRecord(eventId);
  const { mutate: updateRecord } = useUpdateRecord(eventId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedRecordId, setDeletedRecordId] = useState<number | null>(null);
  const [updatedRecordId, setUpdatedRecordId] = useState<number | null>(null);
  const [updatedValue, setUpdateValue] = useState<TUpdateRecordRequest | null>(null);

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
          // target: '',
          // sendType: '',
          contact: '',
        },
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setRows?.((prev) => prev.filter((row) => row.id !== id));
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

  const handleUpdateRecord = (record: TRecordItem) => {
    if (updatedRecordId === record.eventDetailId && updatedValue) {
      updateRecord({ recordId: record.eventDetailId, recordData: updatedValue });
      setUpdatedRecordId(null);
    } else {
      setUpdatedRecordId(record.eventDetailId);
      setUpdateValue({
        type: record.type,
        history: record.history,
        price: record.price,
        name: record.name,
        // tags: record.tags,
        imageUrl: record.image,
        contact: record.contact,
      });
    }
  };

  const handleEditChange = <K extends keyof TUpdateRecordRequest>(key: K, value: TUpdateRecordRequest[K]) => {
    setUpdateValue((prev) => (prev ? { ...prev, [key]: value } : prev));
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
      {mode !== 'create' && records ? (
        <S.Grid $gridTemplateColumns={getRecordGridTemplate(mode, event.eventInfoItems)}>
          <>
            {event.eventInfoItems.map((item) => (
              <S.GridCell key={`header-${item}`} $isHeader>
                {recordReadConfig[item]?.label || item}
                {recordReadConfig[item]?.required && <img src={required} alt="필수 입력" />}
              </S.GridCell>
            ))}
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

              return event.eventInfoItems
                .map((item) => {
                  const config = recordReadConfig[item];

                  if (!config) {
                    return <S.GridCell key={`${recordId}-${item}`}>-</S.GridCell>;
                  }

                  const value = isEditing ? updatedValue?.[config.type] : record[config.type];

                  if (recordId === updatedRecordId) {
                    if (config.type === 'type') {
                      return (
                        <S.GridCell key={`${recordId}-${item}`}>
                          <CustomSelect
                            options={['입금', '출금']}
                            value={value}
                            onChange={(val) => handleEditChange('type', val.toString())}
                            isShowArrow={true}
                          />
                        </S.GridCell>
                      );
                    }

                    if (config.type === 'history') {
                      return (
                        <S.GridCell key={`${recordId}-${item}`}>
                          <S.Input
                            type="text"
                            maxLength={10}
                            value={value}
                            onChange={(e) => handleEditChange('history', e.target.value)}
                          />
                        </S.GridCell>
                      );
                    }

                    if (config.type === 'price') {
                      return (
                        <S.GridCell key={`${recordId}-${item}`}>
                          <CustomSelect
                            options={['50000', '100000', '150000']}
                            value={value}
                            onChange={(val) => handleEditChange('price', val.toString())}
                            isInput={true}
                            isPrice={true}
                          />
                        </S.GridCell>
                      );
                    }

                    if (config.type === 'contact') {
                      return (
                        <S.GridCell key={`${recordId}-${item}`}>
                          <S.Input
                            type="text"
                            value={value}
                            onChange={(e) => handleEditChange('contact', e.target.value)}
                          />
                        </S.GridCell>
                      );
                    }
                  } else {
                    return (
                      <S.GridCell key={`${recordId}-${item}`}>
                        <S.Text>{config.type === 'price' ? formatNumber(value) : value}</S.Text>
                      </S.GridCell>
                    );
                  }

                  return <S.GridCell key={`${recordId}-${item}`}>-</S.GridCell>;
                })
                .concat(
                  ...(mode === 'update'
                    ? [
                        <S.GridCell key={`row-${recordId}-update`}>
                          <S.Button
                            onClick={() => handleUpdateRecord(record)}
                            $textColor={updatedRecordId === recordId ? '#3959a5' : '#ffffff'}
                            $bgColor={updatedRecordId === recordId ? '#ffffff' : '#3959a5'}
                            $borderColor="#3959a5"
                          >
                            {updatedRecordId === recordId ? '저장' : '수정'}
                          </S.Button>
                        </S.GridCell>,
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
                        </S.GridCell>,
                      ]
                    : []),
                );
            })}
          </>
        </S.Grid>
      ) : (
        <S.Grid $gridTemplateColumns={getRecordGridTemplate(mode, event.eventInfoItems)}>
          <>
            {event.eventInfoItems.map((item) => (
              <S.GridCell key={`header-${item}`} $isHeader>
                {recordFieldConfig[item]?.label || item}
                {recordFieldConfig[item]?.required && <img src={required} alt="필수 입력" />}
              </S.GridCell>
            ))}
            <S.GridCell $isHeader />
          </>
          <>
            {rows?.map((row, index) =>
              event.eventInfoItems
                .map((item) => {
                  const config = recordFieldConfig[item];

                  if (!config) {
                    return <S.GridCell key={`${row.id}-${item}`}>-</S.GridCell>;
                  }

                  const value = row.values[config.type];
                  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                    handleChange?.(row.id, config.type, e.target.value);

                  if (config.type === 'type') {
                    return (
                      <S.GridCell key={`${row.id}-${item}`}>
                        <CustomSelect
                          options={['입금', '출금']}
                          value={row.values.type}
                          onChange={(val) => handleChange?.(row.id, 'type', val)}
                          isShowArrow={true}
                        />
                      </S.GridCell>
                    );
                  }

                  if (config.type === 'price') {
                    return (
                      <S.GridCell key={`${row.id}-${item}`}>
                        <CustomSelect
                          options={['50000', '100000', '150000']}
                          value={'row.values.price'}
                          onChange={(val) => handleChange?.(row.id, 'price', val)}
                          isInput={true}
                          isPrice={true}
                        />
                      </S.GridCell>
                    );
                  }

                  if (config.type === 'contact') {
                    return (
                      <S.GridCell key={`${row.id}-${item}`}>
                        <S.Input type="text" value={value} onChange={onChange} />
                      </S.GridCell>
                    );
                  }

                  return (
                    <S.GridCell key={`${row.id}-${item}`}>
                      <S.Input type="text" maxLength={10} value={value} onChange={onChange} />
                    </S.GridCell>
                  );
                })
                .concat(
                  <S.GridCell key={`row-${row.id}-action`}>
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
                  </S.GridCell>,
                ),
            )}
          </>
        </S.Grid>
      )}
      {mode === 'read' ? (
        <S.ButtonArea>
          <S.LinkButton to={`/events/${eventId}`} $textColor="#3959a5" $borderColor="#3959a5">
            이전
          </S.LinkButton>
          <S.LinkButton
            to={`/events/${eventId}/records/update`}
            $textColor="#ffffff"
            $borderColor="#3959a5"
            $bgColor="#3959a5"
          >
            수정
          </S.LinkButton>
          <S.LinkButton
            to={`/events/${eventId}/records/create`}
            $textColor="#ffffff"
            $borderColor="#3959a5"
            $bgColor="#3959a5"
          >
            입출금 내역 등록
          </S.LinkButton>
          <S.Button $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            엑셀 다운로드
          </S.Button>
          <S.LinkButton to={`/events/${eventId}/card`} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            감사장 전송
          </S.LinkButton>
        </S.ButtonArea>
      ) : mode === 'create' ? (
        <S.ButtonArea>
          <S.LinkButton to={`/events/${eventId}`} $textColor="#3959a5" $borderColor="#3959a5">
            이전
          </S.LinkButton>
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
      ) : (
        <S.ButtonArea>
          <S.LinkButton to={`/events/${eventId}/records`} $textColor="#3959a5" $borderColor="#3959a5">
            완료
          </S.LinkButton>
        </S.ButtonArea>
      )}
      {isDeleteModalOpen && deletedRecordId !== null && (
        <AlertModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="입출금 내역 삭제"
          message="확인 클릭 시 입출금 내역이 영구 삭제됩니다. 진행하시겠습니까?"
          onConfirm={() => handleDeleteRecord(selectedRecordId)}
        />
      )}
    </>
  );
};

export default RecordForm;
