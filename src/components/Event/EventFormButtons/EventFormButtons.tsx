import BackButton from '@_components/Common/BackButton/BackButton';
import Button from '@_components/Common/Button/Button';
import { Link } from 'react-router-dom';
import * as S from './EventFormButtons.styles';

/**
 * EventFormButtons 컴포넌트 (이벤트 폼 하단에 표시되는 공통 버튼 컴포넌트)
 * @param mode - 폼의 모드 (create | update | read)
 * @param eventId - 이벤트의 고유 ID
 * @param onSubmit - 저장 버튼 클릭 시 실행되는 콜백 함수
 * @param onDelete - 삭제 버튼 클릭 시 실행되는 콜백 함수
 */

interface Props {
  mode: 'create' | 'update' | 'read';
  eventId?: number;
  onSubmit?: () => void;
  onDelete?: () => void;
}

const EventFormButtons = ({ mode, eventId, onSubmit, onDelete }: Props) => {
  if (mode === 'read') {
    return (
      <S.Wrapper>
        <Button as={Link} to={`/events`} variant="secondary" fontWeight="semibold">
          목록
        </Button>
        <Button as={Link} to={`/events/${eventId}/update`} variant="primary" fontWeight="semibold">
          수정
        </Button>
        <Button onClick={onDelete} variant="primary" fontWeight="semibold">
          삭제
        </Button>
        <Button as={Link} to={`/events/${eventId}/records/create`} variant="primary" fontWeight="semibold">
          입출금 내역 등록
        </Button>
        <Button as={Link} to={`/events/${eventId}/records`} variant="primary" fontWeight="semibold">
          입출금 내역 조회
        </Button>
      </S.Wrapper>
    );
  }
  return (
    <S.Wrapper>
      <BackButton />
      <Button onClick={onSubmit} variant="primary" fontWeight="semibold">
        저장
      </Button>
    </S.Wrapper>
  );
};

export default EventFormButtons;
