export type TButtonSize = 'md';
export type TButtonVariant = 'default' | 'primary' | 'secondary' | 'white' | 'skyblue';
export type TButtonWeight = 'normal' | 'semibold' | 'bold';

export type TStyledButtonProps = {
  $size: TButtonSize;
  $variant: TButtonVariant;
  $fontWeight?: TButtonWeight;
  $fullWidth?: boolean;
};

export type TButtonOwnProps = {
  size?: TButtonSize;
  variant?: TButtonVariant;
  fontWeight?: TButtonWeight;
  fullWidth?: boolean;
  children: React.ReactNode;
};

export type TButtonProps<T extends React.ElementType = 'button'> = TButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TButtonOwnProps> & {
    as?: T;
  };
