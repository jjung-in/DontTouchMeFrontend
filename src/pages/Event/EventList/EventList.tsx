import { TEventListResponse } from '@_types/events.type';
import { Link } from 'react-router-dom';

const data: TEventListResponse = {
  events: [
    {
      eventId: 8,
      eventName: '이벤트 8',
      eventDate: '2025-03-30',
      eventType: '결혼식',
      thumbnailUrl: '',
      address: '서울시 강남구',
    },
    {
      eventId: 6,
      eventName: '이벤트 6',
      eventDate: '2025-03-31',
      eventType: '장례식',
      thumbnailUrl: '',
      address: '서울시 강남구',
    },
  ],
  lastEventId: 6,
};

const EventList = () => {
  return (
    <div>
      <hr />
      <div>
        <h2>이벤트 목록</h2>
      </div>
      <hr />
      <div>
        <Link to="/events/create">생성</Link>
      </div>
      <hr />
      <div>
        {data.events.length ? (
          <div>
            <ul>
              {data.events.map((event) => (
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
        ) : (
          <span>등록된 이벤트가 없습니다.</span>
        )}
      </div>
      <hr />
    </div>
  );
};

export default EventList;
