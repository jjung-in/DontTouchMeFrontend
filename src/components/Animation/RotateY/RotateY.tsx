import * as S from './RotateY.styles';
import { useIntersectionObserver } from '@_hooks/observer/useIntersectionObserver';

/**
 * RotateY 애니메이션 컴포넌트
 * @param children - 애니메이션 대상 요소
 * @param duration - 애니메이션 한 주기의 시간 (초)
 * @param delay - 애니메이션 시작 지연 시간 (초)
 */

interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

const RotateY = ({ children, duration = 1, delay = 0 }: Props) => {
  const { observerRef, visible } = useIntersectionObserver({ threshold: 0.8, once: true });

  return (
    <S.RotateYWrapper ref={observerRef} $visible={visible} $duration={duration} $delay={delay}>
      {children}
    </S.RotateYWrapper>
  );
};

export default RotateY;
