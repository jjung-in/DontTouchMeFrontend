import Button from '@_components/Common/Button/Button';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import EventCard from '@_components/Event/EventCard/EventCard';
import { useIntersectionObserver } from '@_hooks/observer/useIntersectionObserver';
import { useEventList } from '@_hooks/useEvents';
import { useAuthStore } from '@_store/authStore';
import { InfiniteScrollObserverStyle } from '@_styles/common';
import { Link } from 'react-router-dom';
import * as S from './EventList.styles';

const EVENT_LIST_TITLE = {
  title: '이벤트 목록',
  subtitle: '등록된 이벤트를 확인하고, 입출금 내역을 등록할 수 있습니다.',
  highlight: '목록',
};
const PAGE_SIZE = 9;

const EventList = () => {
  const { memberId } = useAuthStore();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEventList(memberId, PAGE_SIZE);
  const { observerRef } = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    threshold: 0.1,
  });
  const events = data?.pages.flatMap((page) => page.events) || [];

  return (
    <S.Main $isEmpty={isLoading ? true : false}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PageTitle {...EVENT_LIST_TITLE} />
          {events.length > 0 ? (
            <S.CardArea>
              <S.CardList>
                {events.map((event) => (
                  <EventCard key={event.eventId} event={event} />
                ))}
              </S.CardList>
              {isFetchingNextPage && hasNextPage && (
                <S.FetchingBox>
                  <Spinner />
                </S.FetchingBox>
              )}
            </S.CardArea>
          ) : (
            <S.EmptyBox>
              <EmptyState message="등록된 이벤트가 없습니다." />
              <Button as={Link} to="/events/create">
                이벤트 만들기 →
              </Button>
            </S.EmptyBox>
          )}
        </>
      )}
      <InfiniteScrollObserverStyle ref={observerRef} />
    </S.Main>
  );
};

export default EventList;
