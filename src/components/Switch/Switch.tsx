import * as S from './Switch.styles';

interface Props {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch = ({ checked, onChange }: Props) => {
  return (
    <S.Container onClick={() => onChange?.(!checked)} $checked={checked}>
      <S.SwitchHandle checked={checked} />
    </S.Container>
  );
};

export default Switch;
