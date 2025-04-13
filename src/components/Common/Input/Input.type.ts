export type TInputVariant = 'default' | 'number' | 'box' | 'textbox' | 'recordtext';
export type TInputState = 'default' | 'error';
export type TInputFormType = 'auth' | 'event' | 'record';

export type TStyledInputProps = {
  $variant: TInputVariant;
  $state: TInputState;
  $formType?: TInputFormType;
  $fullWidth?: boolean;
};

export type TInputOwnProps = {
  variant?: TInputVariant;
  state?: TInputState;
  formType?: TInputFormType;
  fullWidth?: boolean;
};

export type TInputProps<T extends React.ElementType = 'input'> = TInputOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TInputOwnProps> & {
    as?: T;
  };
