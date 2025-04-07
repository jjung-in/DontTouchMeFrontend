import * as S from './EmptyState.styles';

interface Props {
  message?: string;
}

const EmptyState = ({ message }: Props) => {
  return <S.EmptyText>{message || `데이터를 표시할 수 없습니다.`}</S.EmptyText>;
};

export default EmptyState;
