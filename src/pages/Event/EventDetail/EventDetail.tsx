import { useDeleteEvent, useEventDetail } from '@_hooks/useEvents';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EventDetail = () => {
  const navigate = useNavigate();
  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: deleteEvent } = useDeleteEvent();

  const handleDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      deleteEvent(
        { eventId },
        {
          onSuccess: () => {
            navigate(`/events`);
          },
          onError: (error) => {
            console.error('Error deleting event:', error);
          },
        },
      );
    }
  };

  return (
    <div>
      <hr />
      <div>
        <h2>이벤트 상세 정보</h2>
      </div>
      <hr />
      {isFetching ? (
        <div>Loading...</div>
      ) : data ? (
        <>
          <div>
            <Link to="/events">목록</Link>
            &emsp;
            <Link to={`/events/${eventId}/update`}>수정</Link>
            &emsp;
            <button onClick={handleDelete}>삭제</button>
            &emsp;
            <Link to="">입출금 내역 등록</Link>
            &emsp;
            <Link to="">입출금 내역 조회</Link>
          </div>
          <hr />
          <div>
            <div>
              <span>썸네일:</span>
              &emsp; &emsp;
              <span>{data.thumbnailUrl}</span>
            </div>
            <div>
              <span>이벤트명:</span>
              &emsp; &emsp;
              <span>{data.eventName}</span>
            </div>
            <div>
              <span>이벤트 유형:</span>
              &emsp; &emsp;
              <span>{data.eventType}</span>
            </div>
            <div>
              <span>이벤트 일정:</span>
              &emsp; &emsp;
              <span>{data.eventDate}</span>
            </div>
            <div>
              <span>이벤트 장소:</span>
              &emsp; &emsp;
              <span>{data.address}</span>
            </div>
            <div>
              <span>예상 인원:</span>
              &emsp; &emsp;
              <span>{data.participants}</span>
            </div>
            <div>
              <span>입출금 항목:</span>
              &emsp; &emsp;
              {data.eventInfoItems.map((item, index) => (
                <span key={index}>
                  <span>{item}</span>
                  &emsp;
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>데이터 없어요</div>
      )}
      <hr />
    </div>
  );
};

export default EventDetail;
