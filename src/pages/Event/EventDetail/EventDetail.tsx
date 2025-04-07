import { useDeleteEvent, useEventDetail } from '@_hooks/useEvents';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './EventDetail.styles';
import Spinner from '@_components/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import EventForm from '@_components/EventForm/EventForm';

const EventDetail = () => {
  const memberId = 1;
  const eventId = Number(useParams().eventId);
  const navigate = useNavigate();
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: deleteEvent } = useDeleteEvent(memberId);

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
    <>
      {isFetching ? (
        <S.Main>
          <Spinner />
        </S.Main>
      ) : data ? (
        <EventForm mode="read" event={data} handleDelete={handleDelete} />
      ) : (
        <S.Main>
          <EmptyState />
        </S.Main>
      )}
    </>
  );
};

export default EventDetail;
