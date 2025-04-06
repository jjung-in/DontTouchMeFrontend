import { TEventDetailResponse } from '@_types/events.type';
import { useParams } from 'react-router-dom';
import * as S from './EventForm.styles';
import noimage from '@_assets/images/noimage.png';
import required from '@_assets/images/required.png';

interface Props {
  mode: 'create' | 'update' | 'read';
  event?: TEventDetailResponse;
  onDelete?: () => void;
}

const EventForm = ({ mode, event, onDelete }: Props) => {
  const eventId = Number(useParams().eventId);

  return (
    <S.Main>
      <S.Title>이벤트 상세 정보</S.Title>
      <S.SubTitle>등록된 이벤트의 상세 정보를 확인하고, 수정합니다.</S.SubTitle>
      <S.Card>
        <S.FormArea>
          <S.ImageSection>
            {event?.thumbnailUrl ? <S.Thumbnail src={event?.thumbnailUrl} /> : <S.NoImage src={noimage} />}
          </S.ImageSection>
          <S.FieldSection>
            <S.FieldGroup>
              <S.Label>
                이벤트명
                <img src={required} alt="필수 입력" />
              </S.Label>
              <S.ReadOnlyText>{event?.eventName}</S.ReadOnlyText>
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 유형
                <img src={required} alt="필수 입력" />
              </S.Label>
              <S.ReadOnlyText>{event?.eventType}</S.ReadOnlyText>
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 일정
                <img src={required} alt="필수 입력" />
              </S.Label>
              <S.ReadOnlyText>{event?.eventDate}</S.ReadOnlyText>
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 장소
                <img src={required} alt="필수 입력" />
              </S.Label>
              <S.ReadOnlyText>{event?.address}</S.ReadOnlyText>
            </S.FieldGroup>
            {event && event.participants > 0 && (
              <S.FieldGroup>
                <S.Label>예상 인원</S.Label>
                <S.ReadOnlyText>{event?.participants}명</S.ReadOnlyText>
              </S.FieldGroup>
            )}
            <S.FieldGroup>
              <S.Label>입출금 항목</S.Label>
              <S.ReadOnlyBox>
                {event?.eventInfoItems.map((item, index) => (
                  <span key={index}>
                    <span>{item}</span>
                    &emsp;
                  </span>
                ))}
              </S.ReadOnlyBox>
            </S.FieldGroup>
          </S.FieldSection>
        </S.FormArea>
        <S.ButtonArea>
          <S.LinkButton to="/events" $textColor="#3959a5" $borderColor="#3959a5">
            이전
          </S.LinkButton>
          <S.LinkButton to={`/events/${eventId}/update`} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            수정
          </S.LinkButton>
          <S.Button onClick={onDelete} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
            삭제
          </S.Button>
          <S.LinkButton
            to={`/events/${eventId}/records/create`}
            $textColor="#ffffff"
            $borderColor="#3959a5"
            $bgColor="#3959a5"
          >
            입출금 내역 등록
          </S.LinkButton>
          <S.LinkButton
            to={`/events/${eventId}/records`}
            $textColor="#ffffff"
            $borderColor="#3959a5"
            $bgColor="#3959a5"
          >
            입출금 내역 조회
          </S.LinkButton>
        </S.ButtonArea>
      </S.Card>
    </S.Main>
  );
};

export default EventForm;
