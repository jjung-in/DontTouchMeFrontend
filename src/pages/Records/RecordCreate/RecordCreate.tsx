import { useEventDetail } from '@_hooks/useEvents';
import { useCreateRecordsBatch } from '@_hooks/useRecords';
import { TCreateRecordRequest } from '@_types/records.type';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './RecordCreate.styles';
import Spinner from '@_components/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import RecordForm from '@_components/Form/RecordForm/RecordForm';

const RecordCreate = () => {
  const navigate = useNavigate();

  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: createRecordsBatch } = useCreateRecordsBatch();

  const [rows, setRows] = useState<{ id: number; values: TCreateRecordRequest }[]>([
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

  const handleChange = (rowId: number, key: keyof TCreateRecordRequest, value: string | number | string[] | null) => {
    console.log(rowId, key, value);
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, values: { ...row.values, [key]: value } } : row)),
    );
  };

  const handleSubmit = async () => {
    // 유효성 검사
    // if (!validateRecordForm(rows)) return;

    const payload = rows.map((row) => {
      const cleaned: TCreateRecordRequest = { eventId: eventId, type: '', history: '', price: '' };
      for (const [key, value] of Object.entries(row.values)) {
        cleaned[key] = value;
      }
      return cleaned;
    });

    createRecordsBatch(payload, {
      onSuccess: () => {
        navigate(`/events/${eventId}/records`);
      },
      onError: (error) => {
        console.error('Error creating records:', error);
      },
    });
  };

  return (
    <>
      {isFetching ? (
        <S.Main $isEmpty>
          <Spinner />
        </S.Main>
      ) : data ? (
        <S.Main>
          <S.Title>입출금 내역 등록</S.Title>
          <S.SubTitle>등록된 이벤트에 입출금 내역을 등록합니다.</S.SubTitle>
          <RecordForm
            mode="create"
            event={data}
            rows={rows}
            setRows={setRows}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </S.Main>
      ) : (
        <S.Main $isEmpty>
          <EmptyState />
          <S.LinkButton to={`/events/${eventId}`} $textColor="#3959a5" $borderColor="#3959a5">
            돌아가기
          </S.LinkButton>
        </S.Main>
      )}
    </>
  );
};

export default RecordCreate;
