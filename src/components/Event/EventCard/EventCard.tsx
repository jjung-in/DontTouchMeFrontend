import { TEventItem } from '@_types/events.type';
import * as S from './EventCard.styles';
import { getEventStatus } from '@_utils/events';
import Button from '@_components/Common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { BoldTextStyle } from '@_styles/common';
import noimage from '@_assets/images/noimage.png';

/**
 * EventCard 컴포넌트 (이벤트 목록 페이지에서 각 이벤트를 카드 형태로 표시하는 컴포넌트)
 * @param event - 카드에 표시할 이벤트 정보 객체
 */

interface Props {
  event: TEventItem;
}

const EventCard = ({ event }: Props) => {
  const navigate = useNavigate();
  const status = getEventStatus(event.eventDate);

  return (
    <S.Card onClick={() => navigate(`/events/${event.eventId}`)}>
      <S.ImageArea>
        {event.thumbnailUrl ? <S.CardImage src={event.thumbnailUrl} /> : <img src={noimage} />}
        <S.Overlay>
          <Button
            as={Link}
            to={`/events/${event.eventId}/records/create`}
            variant="skyblue"
            onClick={(e) => e.stopPropagation()}
          >
            입출금 내역 <BoldTextStyle>등록</BoldTextStyle>
          </Button>
          <Button
            as={Link}
            to={`/events/${event.eventId}/records`}
            variant="white"
            onClick={(e) => e.stopPropagation()}
          >
            입출금 내역 <BoldTextStyle>조회</BoldTextStyle>
          </Button>
        </S.Overlay>
      </S.ImageArea>
      <S.ContentArea>
        <S.StatusBadge $status={status}>{status}</S.StatusBadge>
        <S.CardTitle>{event.eventName}</S.CardTitle>
        <S.CardDate>{event.eventDate}</S.CardDate>
      </S.ContentArea>
    </S.Card>
  );
};

export default EventCard;
