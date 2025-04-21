import check from '@_assets/icons/check-white.png';
import * as S from './Toast.styles';
import { useToastStore } from '@_store/toastStore';

/**
 * Toast 컴포넌트 (화면 상단에 표시되는 토스트 알림 컴포넌트)
 */

const Toast = () => {
  const { message, type, isVisible } = useToastStore();

  if (!isVisible) return null;

  return (
    <S.Container $type={type}>
      <span>
        <img src={check} />
      </span>
      {message}
    </S.Container>
  );
};

export default Toast;
