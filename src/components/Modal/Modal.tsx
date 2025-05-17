import * as S from './Modal.styles';
import close from '@_assets/icons/close.png';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ size, isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Container $size={size} onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <img src={close} />
        </S.CloseButton>
        {children}
      </S.Container>
    </S.Overlay>
  );
};

export default Modal;
