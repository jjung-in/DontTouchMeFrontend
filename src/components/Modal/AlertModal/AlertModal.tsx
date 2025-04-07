import Modal from '../Modal';
import * as S from './AlertModal.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
}

const AlertModal = ({ isOpen, onClose, title, message, onConfirm }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Title>{title}</S.Title>
      <S.Message>{message}</S.Message>
      <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
    </Modal>
  );
};

export default AlertModal;
