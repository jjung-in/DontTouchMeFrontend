import { useEventList } from '@_hooks/useEvents';
import { useEffect, useRef } from 'react';
import noimage from '@_assets/images/noimage.png';
import * as S from './EventList.styles';
import Spinner from '@_components/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import { getEventStatus } from '@_utils/events';

const EventList = () => {
  const memberId = 1;
  const pageSize = 9;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEventList(memberId, pageSize);
  const events = data?.pages.flatMap((page) => page.events) || [];
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {isLoading ? (
        <S.Main $isEmpty>
          <Spinner />
        </S.Main>
      ) : (
        <S.Main>
          <S.Title>
            <S.BlueText>이벤트</S.BlueText> 목록
          </S.Title>
          <S.SubTitle>등록된 이벤트를 확인하고, 입출금 내역을 등록할 수 있습니다.</S.SubTitle>
          {events.length > 0 ? (
            <S.CardSection>
              <S.CardList>
                {events.map((event, index) => {
                  const status = getEventStatus(event.eventDate);
                  return (
                    <div key={event.eventId} ref={index === events.length - 1 ? observerRef : null}>
                      <S.Card>
                        <S.ImageSection>
                          {event.thumbnailUrl ? <S.CardImage src={event.thumbnailUrl} /> : <S.NoImage src={noimage} />}
                          <S.Overlay>
                            <S.RecordLink to={`/events/${event.eventId}/records/create`} variant="create">
                              입출금 내역 <S.BoldText>등록</S.BoldText>
                            </S.RecordLink>
                            <S.RecordLink to={`/events/${event.eventId}/records`} variant="list">
                              입출금 내역 <S.BoldText>조회</S.BoldText>
                            </S.RecordLink>
                          </S.Overlay>
                        </S.ImageSection>
                        <S.ContentSection to={`/events/${event.eventId}`}>
                          <S.StatusBadge $status={status}>{status}</S.StatusBadge>
                          <S.CardTitle>{event.eventName}</S.CardTitle>
                          <S.CardDate>{event.eventDate}</S.CardDate>
                        </S.ContentSection>
                      </S.Card>
                    </div>
                  );
                })}
              </S.CardList>
              {isFetchingNextPage && hasNextPage && (
                <S.FetchingBox>
                  <Spinner />
                </S.FetchingBox>
              )}
            </S.CardSection>
          ) : (
            <S.EmptyBox>
              <EmptyState message="등록된 이벤트가 없습니다." />
            </S.EmptyBox>
          )}
        </S.Main>
      )}
    </>
  );
};

export default EventList;
