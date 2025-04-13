import { useEventDetail } from '@_hooks/useEvents';
import { useRecordList } from '@_hooks/useRecords';
import { useParams } from 'react-router-dom';
import { useIntersectionObserver } from '@_hooks/observer/useIntersectionObserver';
import * as S from './RecordList.styles';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import RecordForm from '@_components/Form/RecordForm/RecordForm';
import Button from '@_components/Common/Button/Button';
import { Link } from 'react-router-dom';

const RecordList = () => {
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
    <S.Main $isEmpty={isLoading || isFetching ? true : false}>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <>
          <S.Title>입출금 내역</S.Title>
          <S.SubTitle>등록된 이벤트에 입출금 내역을 조회합니다.</S.SubTitle>
          {event && records.length > 0 ? (
            <RecordForm mode="read" event={event} records={records} />
          ) : (
            <S.EmptyBox>
              <EmptyState message="등록된 내역이 없습니다." />
              <Button as={Link} to={`/events/${eventId}`} variant="secondary" fontWeight="semibold">
                돌아가기
              </Button>
            </S.EmptyBox>
          )}
        </>
      )}
      <div ref={observerRef} style={{ height: 1 }} />
    </S.Main>
  );
};

export default RecordList;
