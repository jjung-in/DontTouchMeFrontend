import * as S from './Button.styles';
import { TButtonProps } from './Button.type';

const Button = <T extends React.ElementType = 'button'>({
  size = 'md',
  variant = 'default',
  fullWidth = false,
  fontWeight = 'normal',
  as,
  children,
  ...props
}: TButtonProps<T>) => {
  const Component = as || 'button';

  return (
    <S.StyledButton
      as={Component}
      $size={size}
      $variant={variant}
      $fontWeight={fontWeight}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </S.StyledButton>
  );
};

export default Button;
