import { useEventDetail } from '@_hooks/useEvents';
import { MainContainer, Title } from './EventDetail.styles';
import { useParams } from 'react-router-dom';
import { TEvent } from '@_types/events.type';
import { Link } from 'react-router-dom';

const data: TEvent = {
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
};

const EventDetail = () => {
  const { eventId } = useParams();
  // const { data, isFetching } = useEventDetail(Number(eventId));

  return (
    <MainContainer>
      <div>
        <Title>이벤트 상세 정보</Title>
      </div>
      <div>
        <Link to="/events">목록</Link>
        <Link to={`/events/${eventId}/edit`}>수정</Link>
        <Link to="">입출금 내역 등록</Link>
        <Link to="">입출금 내역 조회</Link>
      </div>
      <div>
        <div>
          <span>이벤트명</span>
          <span>{data.name}</span>
        </div>
        <div>
          <span>이벤트 유형</span>
          <span>{data.type}</span>
        </div>
        <div>
          <span>이벤트 일정</span>
          <span>{data.date}</span>
        </div>
        <div>
          <span>이벤트 장소</span>
          <span>{data.location}</span>
        </div>
        <div>
          <span>예상 인원</span>
          <span>{data.guests}명</span>
        </div>
        <div>
          <span>입출금 항목</span>
          <span></span>
        </div>
      </div>
    </MainContainer>
  );
};

export default EventDetail;
