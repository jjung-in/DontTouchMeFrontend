import DaumPostcode from 'react-daum-postcode';
import * as S from './AddressModal.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
}

const AddressModal = ({ isOpen, onClose, onSelectAddress }: Props) => {
  const handleComplete = (data: { address: string }) => {
    onSelectAddress(data.address);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        <DaumPostcode onComplete={handleComplete} />
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default AddressModal;
