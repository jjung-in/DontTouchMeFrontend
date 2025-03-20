import { useEventList } from '@_hooks/useEvents';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
  const memberId = 1;
  const pageSize = 10;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useEventList(memberId, pageSize);

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

  const events = data?.pages.flatMap((page) => page.events) || [];

  return (
    <div>
      <hr />
      <div>
        <h2>이벤트 목록</h2>
      </div>
      <hr />
      {isLoading ? (
        <div>Loading...</div>
      ) : events.length > 0 ? (
        <>
          <div>
            <Link to="/events/create">생성</Link>
          </div>
          <hr />
          <div>
            <ul>
              {events.map((event) => (
                <li key={event.eventId}>
                  <Link to={`/events/${event.eventId}`}>
                    <span>{event.eventName}</span>
                    &emsp;
                    <span>{event.eventDate}</span>
                    &emsp;
                    <span>{event.eventType}</span>
                    &emsp;
                    <span>{event.address}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>등록된 이벤트가 없습니다.</div>
      )}
      {isFetchingNextPage && <p>다음 페이지 불러오는 중...</p>}
      <div ref={observerRef} style={{ height: '20px' }} />
      <hr />
    </div>
  );
};

export default EventList;
