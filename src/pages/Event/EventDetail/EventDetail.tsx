import PageTitle from '@_components/Common/PageTitle/PageTitle';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import EventForm from '@_components/Event/EventForm/EventForm';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';
import { useDeleteEvent, useEventDetail } from '@_hooks/useEvents';
import { useAuthStore } from '@_store/authStore';
import { useToastStore } from '@_store/toastStore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './EventDetail.styles';

const EVENT_DETAIL_TITLE = {
  title: '이벤트 상세 정보',
  highlight: '이벤트 상세 정보',
  subtitle: '등록된 이벤트의 상세 정보를 확인하고, 수정합니다.',
};

const EventDetail = () => {
  const navigate = useNavigate();
  const { memberId } = useAuthStore();
  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: deleteEvent } = useDeleteEvent(memberId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    deleteEvent(
      { eventId },
      {
        onSuccess: () => {
          navigate(`/events`);
          useToastStore.getState().showToast('이벤트가 삭제되었습니다.');
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
          <PageTitle {...EVENT_DETAIL_TITLE} />
          <EventForm mode="read" event={data} onEventDelete={() => setIsDeleteModalOpen(true)} />
          <AlertModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="이벤트 삭제"
            message="확인 클릭 시 이벤트가 영구 삭제됩니다. 진행하시겠습니까?"
            onConfirm={confirmDelete}
          />
        </>
      ) : (
        <EmptyBoxStyle>
          <EmptyState />
          <BackButton />
        </EmptyBoxStyle>
      )}
    </S.Main>
  );
};

export default EventDetail;
