import { TEvent } from '@_types/events.type';
import { MainContainer, Title } from './EventList.styles';
import { useEventList } from '@_hooks/useEvents';
import { Link } from 'react-router-dom';

const data: TEvent[] = [
  {
    id: 0,
    status: 'active',
    thumbnail: null,
    name: '이벤트 리스트 1',
    type: 'wedding',
    otherTypeName: null,
    date: '2025-03-30',
    location: '서울',
    guests: 100,
    details: {
      transactionCategory: true,
      transactionName: true,
      amount: true,
      name: true,
      tag: true,
      photoAttachment: true,
      depositTarget: true,
      thankYouCard: true,
      thankYouCardType: 'email',
    },
  },
];

const EventList = () => {
  // const { data, isFetching } = useEventList();

  return (
    <MainContainer>
      <div>
        <Title>이벤트 목록</Title>
      </div>
      <div>
        {data && data.length ? (
          <div>
            <ul>
              {data.map((event) => (
                <li key={event.id}>
                  <Link to={`/events/${event.id}`}>
                    <span>{event.name}</span>
                    <span>{event.status}</span>
                    <span>{event.type}</span>
                    <span>{event.location}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <span>등록된 이벤트가 없습니다.</span>
        )}
      </div>
    </MainContainer>
  );
};

export default EventList;
