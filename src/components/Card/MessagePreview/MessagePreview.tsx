import * as S from './MessagePreview.styles';
import { TEventDetailResponse } from '@_types/events.type';
import { TRecipient } from '@_types/cards.type';

interface Props {
  event: TEventDetailResponse;
  recipient?: TRecipient;
}

const MessagePreview = ({ event, recipient }: Props) => {
  return (
    <S.Container>
      {event.sendType === 'EMAIL' && (
        <>
          <S.Title>발송 제목</S.Title>
          <S.MessageTitle>
            {recipient ? (
              <>
                <S.HighlightText>{recipient.name}</S.HighlightText>님,{' '}
                <S.HighlightText>{event.eventName}</S.HighlightText>에 참여해주셔서 감사드립니다.
              </>
            ) : (
              '발송 대상을 선택하면 메시지 미리보기가 표시됩니다.'
            )}
          </S.MessageTitle>
        </>
      )}
      <S.Title>발송 내용</S.Title>
      <S.MessageContent $isEmpty={!recipient}>
        {recipient ? (
          <p>
            <S.HighlightText>{recipient.name}</S.HighlightText>님, 안녕하세요!
            <br />
            이번 <S.HighlightText>{event.eventName}</S.HighlightText>에서 뵐 수 있어 정말 반가웠습니다.
            <br />
            귀한 시간을 내어주신 덕분에 저희에게 큰 힘이 되었습니다.
            <br />
            앞으로도 자주 연락드리겠습니다.
            <br />
            다시 한 번 감사드립니다!
          </p>
        ) : (
          <span>발송 대상을 선택하면 메시지 미리보기가 표시됩니다.</span>
        )}
      </S.MessageContent>
    </S.Container>
  );
};

export default MessagePreview;
