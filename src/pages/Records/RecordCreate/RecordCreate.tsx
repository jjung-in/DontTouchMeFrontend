import { useEventDetail } from '@_hooks/useEvents';
import { useCreateRecordsBatch } from '@_hooks/useRecords';
import { TCreateRecordRequest } from '@_types/records.type';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './RecordCreate.styles';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import RecordForm from '@_components/Form/RecordForm/RecordForm';
import Button from '@_components/Common/Button/Button';
import { Link } from 'react-router-dom';

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
        target: '',
        contact: '',
      },
    },
  ]);

  const handleChange = (rowId: number, key: keyof TCreateRecordRequest, value: string | number | string[] | null) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, values: { ...row.values, [key]: value } } : row)),
    );
  };

  const handleSubmit = async () => {
    // 유효성 검사
    // if (!validateRecordForm(rows)) return;

    const records: TCreateRecordRequest[] = rows.map((row) => {
      const filteredRecord: TCreateRecordRequest = {
        eventId,
        type: row.values.type,
        history: row.values.history,
        price: row.values.price,
        contact: row.values.contact,
      };

      if (row.values.name) filteredRecord.name = row.values.name;
      if (row.values.tags?.length) filteredRecord.tags = row.values.tags;
      if (row.values.imageUrl) filteredRecord.imageUrl = row.values.imageUrl;
      if (row.values.target) filteredRecord.target = row.values.target;
      if (row.values.sendType) filteredRecord.sendType = row.values.sendType;

      return filteredRecord;
    });

    createRecordsBatch(records, {
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
          <Button as={Link} to={`/events/${eventId}`} variant="secondary" fontWeight="semibold">
            돌아가기
          </Button>
        </S.Main>
      )}
    </>
  );
};

export default RecordCreate;
