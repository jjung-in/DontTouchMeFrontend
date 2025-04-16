import * as S from './Floating.styles';

/**
 * Floating 애니메이션 컴포넌트
 * @param children - 애니메이션 대상 요소
 * @param duration - 애니메이션 한 주기의 시간 (초)
 * @param delay - 애니메이션 시작 지연 시간 (초)
 * @param distance - 위아래 이동할 거리 (px)
 */
interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  distance?: number;
}

const Floating = ({ children, duration = 3, delay = 0, distance = 10 }: Props) => {
  return (
    <S.FloatingWrapper $duration={duration} $delay={delay} $distance={distance}>
      {children}
    </S.FloatingWrapper>
  );
};

export default Floating;
