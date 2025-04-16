import * as S from './Switch.styles';

interface Props {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch = ({ checked, onChange }: Props) => {
  return (
    <S.SwitchContainer onClick={() => onChange?.(!checked)} $checked={checked}>
      <S.SwitchHandle checked={checked} />
    </S.SwitchContainer>
  );
};

export default Switch;
