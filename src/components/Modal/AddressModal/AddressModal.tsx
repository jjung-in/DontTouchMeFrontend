import DaumPostcode from 'react-daum-postcode';
import Modal from '../Modal';

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <DaumPostcode onComplete={handleComplete} />
    </Modal>
  );
};

export default AddressModal;
