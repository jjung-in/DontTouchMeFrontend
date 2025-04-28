import Button from '@_components/Common/Button/Button';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { Spinner } from '@_components/Common/Spinner/Spinner.styles';
import EmptyState from '@_components/EmptyState/EmptyState';
import RecordForm from '@_components/Record/RecordForm/RecordForm';
import { useIntersectionObserver } from '@_hooks/observer/useIntersectionObserver';
import { useEventDetail } from '@_hooks/useEvents';
import { useRecordList } from '@_hooks/useRecords';
import { InfiniteScrollObserverStyle } from '@_styles/common';
import { Link, useParams } from 'react-router-dom';
import * as S from './RecordUpdate.styles';

const RECORD_UPDATE_TITLE = {
  title: '입출금 내역 수정',
  highlight: '입출금 내역 수정',
  subtitle: '등록된 이벤트에 대한 입출금 내역을 수정합니다.',
};

const PAGE_SIZE = 10;

const RecordUpdate = () => {
  const eventId = Number(useParams().eventId);
  const { data: event, isFetching } = useEventDetail(eventId);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecordList(eventId, PAGE_SIZE);
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
          <PageTitle {...RECORD_UPDATE_TITLE} />
          {event && records.length > 0 ? (
            <RecordForm mode="update" event={event} records={records} />
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
      <InfiniteScrollObserverStyle ref={observerRef} />
    </S.Main>
  );
};

export default RecordUpdate;
