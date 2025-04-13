import { useDeleteEvent, useEventDetail } from '@_hooks/useEvents';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './EventDetail.styles';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import EventForm from '@_components/Form/EventForm/EventForm';
import { useState } from 'react';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';

const EventDetail = () => {
  const memberId = 1;
  const eventId = Number(useParams().eventId);
  const navigate = useNavigate();
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: deleteEvent } = useDeleteEvent(memberId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteEvent(
      { eventId },
      {
        onSuccess: () => {
          navigate(`/events`);
        },
      },
    );
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {isFetching ? (
        <S.Main>
          <Spinner />
        </S.Main>
      ) : data ? (
        <>
          <EventForm mode="read" event={data} handleDelete={handleDelete} />
          <AlertModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="이벤트 삭제"
            message="확인 클릭 시 이벤트가 영구 삭제됩니다. 진행하시겠습니까?"
            onConfirm={confirmDelete}
          />
        </>
      ) : (
        <S.Main>
          <EmptyState />
        </S.Main>
      )}
    </>
  );
};

export default EventDetail;
