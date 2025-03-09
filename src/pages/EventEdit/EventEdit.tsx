import { useParams } from 'react-router-dom';
import { MainContainer, Title } from './EventEdit.styles';

const EventEdit = () => {
  const { eventId } = useParams();
  // const { data, isFetching } = useEventDetail(Number(eventId));

  return (
    <MainContainer>
      <div>
        <Title>이벤트 수정</Title>
        <div>
          <button>이전</button>
          <button>저장</button>
        </div>
      </div>
      <div>
        <form id="eventForm"></form>
      </div>
    </MainContainer>
  );
};

export default EventEdit;
