import { uploadImage } from '@_api/image';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';
import { useDeleteRecord, useUpdateRecord } from '@_hooks/useRecords';
import { TEventDetailResponse } from '@_types/events.type';
import { TCreateRecordRequest, TRecordFormErrors, TRecordFormValues, TRecordItem } from '@_types/records.type';
import { getRecordGridTemplate, validateSingleRecord } from '@_utils/records';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateRecordRow from '../CreateRecordRow/CreateRecordRow';
import ReadRecordRow from '../ReadRecordRow/ReadRecordRow';
import RecordFormButtons from '../RecordFormButtons/RecordFormButtons';
import RecordGridHead from '../RecordGridHead/RecordGridHead';
import UpdateRecordRow from '../UpdateRecordRow/UpdateRecordRow';
import * as S from './RecordForm.styles';

interface Props {
  mode: 'create' | 'update' | 'read';
  event: TEventDetailResponse;
  records?: TRecordItem[];
  rows?: { id: number; values: TRecordFormValues }[];
  setRows?: React.Dispatch<React.SetStateAction<{ id: number; values: TRecordFormValues }[]>>;
  errors?: Record<number, TRecordFormErrors>;
  handleSubmit?: () => void;
  handleChange?: (id: number, key: keyof TCreateRecordRequest, value: string | number | string[] | File | null) => void;
}

const RecordForm = ({ mode, event, records, rows, setRows, errors, handleSubmit, handleChange }: Props) => {
  const eventId = Number(useParams().eventId);
  const { mutate: deleteRecord } = useDeleteRecord(eventId);
  const { mutate: updateRecord } = useUpdateRecord(eventId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedRecordId, setDeletedRecordId] = useState<number | null>(null);
  const [updatedRecordId, setUpdatedRecordId] = useState<number | null>(null);
  const [updatedValue, setUpdatedValue] = useState<TRecordFormValues | null>(null);
  const [updateError, setUpdateError] = useState<TRecordFormErrors | null>(null);

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

  const handleUpdateChange = (key: keyof TRecordFormValues, value: string | number | string[] | File | null) => {
    if (key === 'contact' && event.sendType === 'PHONE' && typeof value === 'string') {
      const onlyNumbers = value.replace(/[^0-9]/g, '');
      value = onlyNumbers;
    }

    setUpdatedValue((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleUpdateRecord = async (record: TRecordItem) => {
    if (updatedRecordId === record.eventDetailId && updatedValue) {
      const invalidFields = validateSingleRecord(updatedValue, event.sendType);
      setUpdateError(invalidFields);
      if (Object.keys(invalidFields).length > 0) return;

      if (updatedValue.imageFile) {
        let imageUrl = '';
        try {
          imageUrl = await uploadImage(updatedValue.imageFile);
          updatedValue.imageUrl = imageUrl;
        } catch {
          console.warn('이미지 업로드에 실패했습니다.');
        }
      }

      updateRecord({ recordId: record.eventDetailId, recordData: updatedValue });
      setUpdatedRecordId(null);
    } else {
      setUpdatedRecordId(record.eventDetailId);
      setUpdatedValue({
        type: record.type,
        history: record.history,
        price: record.price,
        name: record.name || '',
        tags: record.tags,
        imageUrl: record.image || '',
        target: record.target || '',
        contact: record.contact || '',
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

  return (
    <>
      <S.Grid $gridTemplateColumns={getRecordGridTemplate(mode, event.eventInfoItems)}>
        <RecordGridHead mode={mode} event={event} />
        {mode === 'read' &&
          records?.map((record) => <ReadRecordRow key={record.eventDetailId} event={event} record={record} />)}
        {mode === 'create' &&
          rows?.map((row, index) => (
            <CreateRecordRow
              key={row.id}
              event={event}
              row={row}
              errors={errors || {}}
              isFirstRow={index === 0}
              onChange={handleChange || (() => {})}
              onAddRow={handleAddRow}
              onDeleteRow={() => handleDeleteRow(row.id)}
            />
          ))}
        {mode === 'update' &&
          records?.map((record) => (
            <UpdateRecordRow
              key={record.eventDetailId}
              event={event}
              record={record}
              errors={updateError}
              activeRow={updatedRecordId}
              updatedValue={updatedValue}
              onChange={handleUpdateChange}
              onUpdate={handleUpdateRecord}
              onDelete={() => {
                setDeletedRecordId(record.eventDetailId);
                setIsDeleteModalOpen(true);
              }}
            />
          ))}
      </S.Grid>
      <RecordFormButtons
        mode={mode}
        eventId={eventId}
        onSubmit={handleSubmit}
        isSendAvailable={event.sendType === 'EMAIL' || event.sendType === 'PHONE'}
      />
      {isDeleteModalOpen && deletedRecordId !== null && (
        <AlertModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="입출금 내역 삭제"
          message={`확인 클릭 시 입출금 내역이 영구 삭제됩니다.\n진행하시겠습니까?`}
          onConfirm={() => handleDeleteRecord(deletedRecordId)}
        />
      )}
    </>
  );
};

export default RecordForm;
