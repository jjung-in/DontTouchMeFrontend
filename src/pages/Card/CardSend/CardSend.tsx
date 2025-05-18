import noimage from '@_assets/images/noimage.png';
import MessagePreview from '@_components/Card/MessagePreview/MessagePreview';
import RecipientList from '@_components/Card/RecipientList/RecipientList';
import Button from '@_components/Common/Button/Button';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { Spinner } from '@_components/Common/Spinner/Spinner.styles';
import EmptyState from '@_components/EmptyState/EmptyState';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';
import {
  useGetRecipients,
  useRecipientSelection,
  useRecipientsWithId,
  useSendEmail,
  useSendSMS,
} from '@_hooks/useCards';
import { useEventDetail } from '@_hooks/useEvents';
import { useAuthStore } from '@_store/authStore';
import { TSendEmailRequest, TSendSMSRequest } from '@_types/cards.type';
import { getEventStatus } from '@_utils/events';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as S from './CardSend.styles';

const CARD_SEND_TITLE = {
  title: '감사장 전송',
  highlight: '감사장 전송',
  subtitle: '감사장을 전송할 대상을 선택하고, 내용을 입력합니다.',
};

const CardSend = () => {
  const navigate = useNavigate();
  const eventId = Number(useParams().eventId);
  const { isTestUser } = useAuthStore();

  const { data: event, isFetching: isEventFetching } = useEventDetail(eventId);
  const { data: recipients, isFetching: isRecipientsFetching } = useGetRecipients(eventId);

  const recipientsWithId = useRecipientsWithId(recipients);

  const { selectedRecipients, isAllSelected, handleToggleRecipient, handleSelectAll, handleDeselectAll } =
    useRecipientSelection(recipientsWithId);

  const { mutate: sendEmail, isPending: isEmailPending } = useSendEmail();
  const { mutate: sendSMS, isPending: isSMSPending } = useSendSMS();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendClick = () => {
    if (isTestUser) {
      alert('테스트 계정으로는 감사장 전송 기능을 이용할 수 없습니다.');
      return;
    }

    if (!event?.eventName) {
      alert('감사장을 전송할 수 없습니다.');
      return;
    }

    if (selectedRecipients.length === 0) {
      alert('발송 대상을 선택해주세요.');
      return;
    }

    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (event?.sendType === 'EMAIL') {
      const payload: TSendEmailRequest = {
        recipients: selectedRecipients,
        eventName: event?.eventName || '',
        fromEmail: 'payble.reply@gmail.com',
      };

      sendEmail(payload, {
        onSuccess: () => {
          navigate(`/events/${eventId}/card/complete`, {
            state: {
              count: selectedRecipients.length,
            },
          });
        },
        onError: () => {
          alert('이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
      });
    } else if (event?.sendType === 'PHONE') {
      const payload: TSendSMSRequest = {
        recipients: selectedRecipients,
        eventName: event?.eventName || '',
      };

      sendSMS(payload, {
        onSuccess: () => {
          navigate(`/events/${eventId}/card/complete`, {
            state: {
              count: selectedRecipients.length,
            },
          });
        },
        onError: () => {
          alert('SMS 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
      });
    }
  };

  if (isEventFetching || isRecipientsFetching) {
    return (
      <S.Main $isEmpty={true}>
        <Spinner />
      </S.Main>
    );
  }

  if (!event) {
    return (
      <S.Main $isEmpty={true}>
        <S.EmptyBox>
          <EmptyState />
          <Button as={Link} to={`/events/${eventId}/records`} variant="secondary" fontWeight="semibold">
            돌아가기
          </Button>
        </S.EmptyBox>
      </S.Main>
    );
  }

  const status = getEventStatus(event.eventDate);
  const lastSelectedRecipient = selectedRecipients[selectedRecipients.length - 1];

  return (
    <S.Main $isEmpty={false}>
      <PageTitle {...CARD_SEND_TITLE} />
      <S.EventInfo>
        <S.ImageBox>
          {event.thumbnailUrl ? <S.EventImage src={event.thumbnailUrl} /> : <img src={noimage} />}
        </S.ImageBox>
        <S.EventContent>
          <S.StatusBadge $status={status}>{status}</S.StatusBadge>
          <S.EventTitle>{event.eventName}</S.EventTitle>
          <S.EventDate>{event.eventDate}</S.EventDate>
        </S.EventContent>
      </S.EventInfo>
      <S.SendSection>
        <RecipientList
          recipients={recipientsWithId}
          selectedRecipients={selectedRecipients}
          isAllSelected={isAllSelected}
          onToggle={handleToggleRecipient}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />
        <MessagePreview event={event} recipient={lastSelectedRecipient} />
      </S.SendSection>
      <S.ButtonSection>
        <Button as={Link} to={`/events/${eventId}/records`} variant="secondary" fontWeight="semibold">
          이전
        </Button>
        <Button onClick={handleSendClick} variant="primary" fontWeight="semibold">
          전송
        </Button>
      </S.ButtonSection>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="감사장 전송"
        message={
          isEmailPending || isSMSPending
            ? '감사장을 전송하고 있습니다.'
            : `확인 클릭 시 ${selectedRecipients.length}명에게 감사장이 전송됩니다.\n진행하시겠습니까?`
        }
        onConfirm={isEmailPending || isSMSPending ? () => {} : handleSubmit}
      />
    </S.Main>
  );
};

export default CardSend;
