import { useEventDetail } from '@_hooks/useEvents';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './CardSend.styles';
import noimage from '@_assets/images/noimage.png';
import { getEventStatus } from '@_utils/events';
import { useGetSendRecipients, useRecipientSelection, useSendEmail } from '@_hooks/useCards';
import { Spinner } from '@_components/Common/Spinner/Spinner.styles';
import EmptyState from '@_components/EmptyState/EmptyState';
import { Link } from 'react-router-dom';
import Button from '@_components/Common/Button/Button';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import RecipientList from '@_components/Card/RecipientList/RecipientList';
import MessagePreview from '@_components/Card/MessagePreview/MessagePreview';
import { useMemo, useState } from 'react';
import { TSendEmailRequest } from '@_types/cards.type';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';

const CARD_SEND_TITLE = {
  title: '감사장 전송',
  highlight: '감사장 전송',
  subtitle: '감사장을 전송할 대상을 선택하고, 내용을 입력합니다.',
};

const CardSend = () => {
  const navigate = useNavigate();
  const eventId = Number(useParams().eventId);
  const { data: event, isFetching: isEventFetching } = useEventDetail(eventId);
  const { data: recipients, isFetching: isRecipientsFetching } = useGetSendRecipients(eventId);
  const { mutate: sendEmail, isPending } = useSendEmail();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recipientsWithId = useMemo(() => {
    if (!recipients?.recipients) return [];
    return recipients.recipients.map((recipient, index) => ({
      ...recipient,
      id: `${recipient.name}-${recipient.contact}-${index}`,
    }));
  }, [recipients]);

  const { selectedRecipients, isAllSelected, handleToggleRecipient, handleSelectAll, handleDeselectAll } =
    useRecipientSelection(recipientsWithId);

  const handleSendClick = () => {
    if (!event?.eventName) {
      alert('감사장을 전송할 수 없습니다.');
      return;
    }

    if (selectedRecipients.length === 0) {
      alert('발송 대상을 선택해주세요.');
      return;
    }

    if (event?.sendType !== 'EMAIL') {
      alert('현재는 이메일 전송만 지원됩니다.\nSMS 전송은 추후 지원될 예정입니다.');
      return;
    }

    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
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
        alert('전송 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <S.Main $isEmpty={isEventFetching || isRecipientsFetching}>
      {isEventFetching ? (
        <Spinner />
      ) : (
        <>
          {event ? (
            (() => {
              const status = getEventStatus(event.eventDate);
              return (
                <>
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
                    <MessagePreview event={event} recipient={selectedRecipients[selectedRecipients.length - 1]} />
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
                      isPending
                        ? '감사장을 전송하고 있습니다.'
                        : `확인 클릭 시 ${selectedRecipients.length}명에게 감사장이 전송됩니다. 진행하시겠습니까?`
                    }
                    onConfirm={isPending ? () => {} : handleSubmit}
                  />
                </>
              );
            })()
          ) : (
            <S.EmptyBox>
              <EmptyState />
              <Button as={Link} to={`/events/${eventId}/records`} variant="secondary" fontWeight="semibold">
                돌아가기
              </Button>
            </S.EmptyBox>
          )}
        </>
      )}
    </S.Main>
  );
};

export default CardSend;
