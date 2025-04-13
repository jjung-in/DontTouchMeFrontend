import * as S from './Tag.styles';
import close from '@_assets/icons/close.png';

interface Props {
  label: string;
  isButton?: boolean;
  handleDelete?: () => void;
}

const Tag = ({ label, isButton, handleDelete }: Props) => {
  return (
    <S.TagContainer>
      {label}
      {isButton && (
        <S.RemoveButton onClick={handleDelete}>
          <img src={close} />
        </S.RemoveButton>
      )}
    </S.TagContainer>
  );
};

export default Tag;
