import { useEventDetail } from '@_hooks/useEvents';
import { useRecordList } from '@_hooks/useRecords';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './RecordList.styles';
import Spinner from '@_components/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import RecordForm from '@_components/Form/RecordForm/RecordForm';

const RecordList = () => {
  const eventId = Number(useParams().eventId);
  const pageSize = 10;
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { data: event, isFetching } = useEventDetail(eventId);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecordList(eventId, pageSize);
  const records = data?.pages.flatMap((page) => page.eventDetails) || [];

  useEffect(() => {
    const target = observerRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {isLoading || isFetching ? (
        <S.Main $isEmpty>
          <Spinner />
        </S.Main>
      ) : (
        <S.Main>
          <S.Title>입출금 내역</S.Title>
          <S.SubTitle>등록된 이벤트에 입출금 내역을 조회합니다.</S.SubTitle>
          {event && records.length > 0 ? (
            <RecordForm mode="read" event={event} records={records} />
          ) : (
            <S.EmptyBox>
              <EmptyState message="등록된 내역이 없습니다." />
              <S.LinkButton to={`/events/${eventId}`} $textColor="#3959a5" $borderColor="#3959a5">
                돌아가기
              </S.LinkButton>
            </S.EmptyBox>
          )}
        </S.Main>
      )}
      <div ref={observerRef} style={{ height: 1 }} />
    </>
  );
};

export default RecordList;
