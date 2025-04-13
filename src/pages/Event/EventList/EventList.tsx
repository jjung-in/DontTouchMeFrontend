import { useEventList } from '@_hooks/useEvents';
import { useIntersectionObserver } from '@_hooks/observer/useIntersectionObserver';
import { getEventStatus } from '@_utils/events';
import * as S from './EventList.styles';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import noimage from '@_assets/images/noimage.png';
import Button from '@_components/Common/Button/Button';
import { Link } from 'react-router-dom';

const EventList = () => {
  const memberId = 1;
  const pageSize = 9;
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEventList(memberId, pageSize);
  const events = data?.pages.flatMap((page) => page.events) || [];
  const { observerRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    threshold: 0.1,
  });

  return (
    <S.Main $isEmpty={isLoading ? true : false}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <S.Title>
            <S.BlueText>이벤트</S.BlueText> 목록
          </S.Title>
          <S.SubTitle>등록된 이벤트를 확인하고, 입출금 내역을 등록할 수 있습니다.</S.SubTitle>
          {events.length > 0 ? (
            <S.CardSection>
              <S.CardList>
                {events.map((event) => {
                  const status = getEventStatus(event.eventDate);
                  return (
                    <div key={event.eventId}>
                      <S.Card>
                        <S.ImageSection>
                          {event.thumbnailUrl ? <S.CardImage src={event.thumbnailUrl} /> : <S.NoImage src={noimage} />}
                          <S.Overlay>
                            <Button as={Link} to={`/events/${event.eventId}/records/create`} variant="skyblue">
                              입출금 내역 <S.BoldText>등록</S.BoldText>
                            </Button>
                            <Button as={Link} to={`/events/${event.eventId}/records`} variant="white">
                              입출금 내역 <S.BoldText>조회</S.BoldText>
                            </Button>
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
        </>
      )}
      <div ref={observerRef} style={{ height: 1 }} />
    </S.Main>
  );
};

export default EventList;
