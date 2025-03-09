import { useEventDetail } from '@_hooks/useEvents';
import { MainContainer, Title } from './EventDetail.styles';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EventDetail = () => {
  const { eventId } = useParams();
  const { data, isFetching } = useEventDetail(Number(eventId));

  return (
    <MainContainer>
      <div>
        <Title>이벤트 상세 정보</Title>
      </div>
      {isFetching ? (
        <div>Loading...</div>
      ) : data ? (
        <>
          <div>
            <Link to="/events">목록</Link>
            <Link to={`/events/${eventId}/edit`}>수정</Link>
            <Link to="">입출금 내역 등록</Link>
            <Link to="">입출금 내역 조회</Link>
          </div>
          <div>
            <div>
              <span>이벤트명</span>
              <span>{data.eventName}</span>
            </div>
            <div>
              <span>이벤트 유형</span>
              <span>{data.eventType}</span>
            </div>
            <div>
              <span>이벤트 일정</span>
              <span>{data.eventDate}</span>
            </div>
            <div>
              <span>이벤트 장소</span>
              <span>{data.address}</span>
            </div>
            <div>
              <span>예상 인원</span>
              <span>{data.participants}명</span>
            </div>
            <div>
              <span>입출금 항목</span>
              <span></span>
            </div>
          </div>
        </>
      ) : (
        <div>데이터 없어요</div>
      )}
    </MainContainer>
  );
};

export default EventDetail;
