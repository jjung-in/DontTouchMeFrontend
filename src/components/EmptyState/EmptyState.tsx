interface Props {
  message?: string;
}

const EmptyState = ({ message }: Props) => {
  return <p>{message || `데이터를 표시할 수 없습니다.`}</p>;
};

export default EmptyState;
