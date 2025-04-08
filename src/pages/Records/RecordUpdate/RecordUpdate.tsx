import { useParams } from 'react-router-dom';
import * as S from './RecordUpdate.styles';
import { useEventDetail } from '@_hooks/useEvents';
import { useRecordList } from '@_hooks/useRecords';
import { useEffect, useRef } from 'react';
import { Spinner } from '@_components/Spinner/Spinner.styles';
import RecordForm from '@_components/Form/RecordForm/RecordForm';
import EmptyState from '@_components/EmptyState/EmptyState';

const RecordUpdate = () => {
  const eventId = Number(useParams().eventId);
  const pageSize = 10;

  const { data: event, isFetching } = useEventDetail(eventId);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecordList(eventId, pageSize);
  const records = data?.pages.flatMap((page) => page.eventDetails) || [];
  const observerRef = useRef<HTMLDivElement | null>(null);

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
          <S.Title>입출금 내역 수정</S.Title>
          <S.SubTitle>등록된 이벤트에 입출금 내역을 수정합니다.</S.SubTitle>
          {event && records.length > 0 ? (
            <>
              <RecordForm mode="update" event={event} records={records} />
              <div ref={observerRef} style={{ height: 1 }} />
            </>
          ) : (
            <S.EmptyBox>
              <EmptyState message="등록된 내역이 없습니다." />
            </S.EmptyBox>
          )}
        </S.Main>
      )}
    </>
  );
};

export default RecordUpdate;
