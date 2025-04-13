export type TInputVariant = 'default' | 'number' | 'text' | 'box' | 'textbox';
export type TInputState = 'default' | 'error';

export type TStyledInputProps = {
  $variant: TInputVariant;
  $state: TInputState;
  $fullWidth?: boolean;
};

export type TInputOwnProps = {
  variant?: TInputVariant;
  state?: TInputState;
  fullWidth?: boolean;
};

export type TInputProps<T extends React.ElementType = 'input'> = TInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TInputOwnProps> & {
    as?: T;
  };
