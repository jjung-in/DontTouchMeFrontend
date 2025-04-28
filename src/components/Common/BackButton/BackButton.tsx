import Button from '@_components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';

/**
 * BackButton 컴포넌트 (이전 페이지로 이동하는 버튼 컴포넌트)
 * @param label - 버튼에 표시할 텍스트
 */

interface Props {
  label?: string;
}

const BackButton = ({ label = '이전' }: Props) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} variant="secondary" fontWeight="semibold">
      {label}
    </Button>
  );
};

export default BackButton;
