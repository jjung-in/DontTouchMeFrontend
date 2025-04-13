import styled, { css } from 'styled-components';
import { TStyledInputProps } from './Input.type';
import arrow from '@_assets/icons/arrow-down.png';

const VARIANTS = {
  default: css``,
  number: css``,
  text: css``,
  box: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px 30px;
  `,
  textbox: css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};

const STATE = {
  default: css`
    border: 1px solid ${({ theme }) => theme.color.gray[100]};
  `,
  error: css`
    border: 1px solid ${({ theme }) => theme.color.error};
  `,
};

export const StyledInput = styled.input<TStyledInputProps>`
  ${({ $variant }) => VARIANTS[$variant]}
  ${({ $state }) => STATE[$state]}

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: 15px;
  border-radius: 5px;
  background-color: #ffffff;

  &::placeholder {
    color: ${({ theme }) => theme.color.text.gray};
  }

  &:focus {
    border-color: ${({ theme, $state }) => ($state === 'error' ? theme.color.error : theme.color.gray[300])};
  }

  ${({ as }) =>
    as === 'select' &&
    css`
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;

      background-image: url(${arrow});
      background-repeat: no-repeat;
      background-position: right 15px center;
    `}

  ${({ $variant }) =>
    $variant === 'number' &&
    css`
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    `}
`;
