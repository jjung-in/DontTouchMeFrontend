import * as S from './FadeInUp.styles';
import { useIntersectionObserver } from '@_hooks/observer/useIntersectionObserver';

/**
 * FadeIn 애니메이션 컴포넌트
 * @param children - 애니메이션 대상 요소
 * @param delay - 애니메이션 시작 지연 시간 (초)
 */

interface Props {
  children: React.ReactNode;
  delay?: number;
}

const FadeInUp = ({ children, delay = 0 }: Props) => {
  const { observerRef, visible } = useIntersectionObserver({ threshold: 0.8, once: true });

  return (
    <S.FadeInUpWrapper ref={observerRef} $visible={visible} $delay={delay}>
      {children}
    </S.FadeInUpWrapper>
  );
};

export default FadeInUp;
