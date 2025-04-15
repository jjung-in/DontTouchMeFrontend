import { useDeleteEvent, useEventDetail } from '@_hooks/useEvents';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './EventDetail.styles';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import EventForm from '@_components/Event/EventForm/EventForm';
import { useState } from 'react';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';
import PageTitle from '@_components/Common/PageTitle/PageTitle';

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
    <S.Main $isEmpty={isFetching || !data}>
      {isFetching ? (
        <Spinner />
      ) : data ? (
        <>
          <PageTitle
            title="이벤트 상세 정보"
            highlight="이벤트 상세 정보"
            subtitle="등록된 이벤트의 상세 정보를 확인하고, 수정합니다."
          />
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
        <EmptyState />
      )}
    </S.Main>
  );
};

export default EventDetail;
