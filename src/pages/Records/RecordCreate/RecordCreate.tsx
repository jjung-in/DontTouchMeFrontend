import Button from '@_components/Common/Button/Button';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import RecordForm from '@_components/Record/RecordForm/RecordForm';
import { useEventDetail } from '@_hooks/useEvents';
import { useCreateRecordsBatch } from '@_hooks/useRecords';
import { TCreateRecordRequest, TRecordFormErrors, TRecordFormValues } from '@_types/records.type';
import { validateRecordForm } from '@_utils/records';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as S from './RecordCreate.styles';

const RECORD_CREATE_TITLE = {
  title: '입출금 내역',
  highlight: '입출금 내역',
  subtitle: '등록된 이벤트에 대한 입출금 내역을 조회합니다.',
};

const RecordCreate = () => {
  const navigate = useNavigate();
  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: createRecordsBatch } = useCreateRecordsBatch(eventId);

  const [rows, setRows] = useState<{ id: number; values: TRecordFormValues }[]>([
    {
      id: Date.now(),
      values: {
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
  const [errors, setErrors] = useState<Record<number, TRecordFormErrors>>({});

  const handleChange = (rowId: number, key: keyof TCreateRecordRequest, value: string | number | string[] | null) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, values: { ...row.values, [key]: value } } : row)),
    );
  };

  const handleSubmit = async () => {
    const invalidMap = validateRecordForm(rows);
    setErrors(invalidMap);
    if (Object.keys(invalidMap).length > 0) return;

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
    });
  };

  return (
    <S.Main $isEmpty={isFetching || !data}>
      {isFetching ? (
        <Spinner />
      ) : data ? (
        <>
          <PageTitle {...RECORD_CREATE_TITLE} />
          <RecordForm
            mode="create"
            event={data}
            rows={rows}
            setRows={setRows}
            errors={errors}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </>
      ) : (
        <>
          <EmptyState />
          <Button as={Link} to={`/events/${eventId}`} variant="secondary" fontWeight="semibold">
            돌아가기
          </Button>
        </>
      )}
    </S.Main>
  );
};

export default RecordCreate;
