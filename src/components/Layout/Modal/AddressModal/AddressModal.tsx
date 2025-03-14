import DaumPostcode from 'react-daum-postcode';
import { CloseButton, ModalContainer, Overlay } from './AddressModal.styles';

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
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <DaumPostcode onComplete={handleComplete} />
      </ModalContainer>
    </Overlay>
  );
};

export default AddressModal;
