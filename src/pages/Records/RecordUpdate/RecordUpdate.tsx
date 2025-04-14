import { useParams } from 'react-router-dom';
import { useEventDetail } from '@_hooks/useEvents';
import { useRecordList } from '@_hooks/useRecords';
import { useIntersectionObserver } from '@_hooks/observer/useIntersectionObserver';
import * as S from './RecordUpdate.styles';
import { Spinner } from '@_components/Common/Spinner/Spinner.styles';
import RecordForm from '@_components/Form/RecordForm/RecordForm';
import EmptyState from '@_components/EmptyState/EmptyState';
import PageTitle from '@_components/Common/PageTitle/PageTitle';

const RecordUpdate = () => {
  const eventId = Number(useParams().eventId);
  const pageSize = 10;

  const { data: event, isFetching } = useEventDetail(eventId);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecordList(eventId, pageSize);
  const records = data?.pages.flatMap((page) => page.eventDetails) || [];
  const { observerRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    threshold: 0.1,
  });

  return (
    <S.Main $isEmpty={isLoading || isFetching}>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <>
          <PageTitle
            title="입출금 내역 수정"
            highlight="입출금 내역 수정"
            subtitle="등록된 이벤트에 대한 입출금 내역을 수정합니다."
          />
          {event && records.length > 0 ? (
            <RecordForm mode="update" event={event} records={records} />
          ) : (
            <S.EmptyBox>
              <EmptyState message="등록된 내역이 없습니다." />
            </S.EmptyBox>
          )}
        </>
      )}
      <div ref={observerRef} style={{ height: 1 }} />
    </S.Main>
  );
};

export default RecordUpdate;
