import * as S from './Input.styles';
import { TInputProps } from './Input.type';

const Input = <T extends React.ElementType = 'input'>({
  variant = 'default',
  state = 'default',
  fullWidth = false,
  as,
  ...props
}: TInputProps<T>) => {
  const Component = as || 'input';

  return <S.StyledInput as={Component} $variant={variant} $state={state} $fullWidth={fullWidth} {...props} />;
};

export default Input;
