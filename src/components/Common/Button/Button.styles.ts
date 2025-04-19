import styled, { css } from 'styled-components';
import { TStyledButtonProps } from './Button.type';

const SIZES = {
  md: css`
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 15px 30px;
  `,
};

const VARIANTS = {
  default: css`
    color: ${({ theme }) => theme.color.text.black};
    background-color: ${({ theme }) => theme.color.primary[50]};
    border: 1px solid ${({ theme }) => theme.color.primary[500]};
    border-radius: 6px;
  `,
  primary: css`
    color: ${({ theme }) => theme.color.text.white};
    background-color: ${({ theme }) => theme.color.primary[500]};
    border: 1px solid ${({ theme }) => theme.color.primary[500]};
    border-radius: 6px;
  `,
  secondary: css`
    color: ${({ theme }) => theme.color.text.primary};
    background-color: ${({ theme }) => theme.color.primary[50]};
    border: 1px solid ${({ theme }) => theme.color.primary[500]};
    border-radius: 6px;
  `,
  white: css`
    color: ${({ theme }) => theme.color.text.black};
    background-color: ${({ theme }) => theme.color.primary[50]};
    padding: 25px 20px;
    border-radius: 10px;

    &:hover {
      text-decoration: underline;
    }
  `,
  skyblue: css`
    color: ${({ theme }) => theme.color.text.black};
    background-color: ${({ theme }) => theme.color.primary[200]};
    padding: 25px 20px;
    border-radius: 10px;

    &:hover {
      text-decoration: underline;
    }
  `,

  outlined: css`
    color: ${({ theme }) => theme.color.primary[500]};
    background-color: #ffffff;
    border: 1px solid ${({ theme }) => theme.color.primary[500]};
    border-radius: 6px;
  `,
};

export const StyledButton = styled.button<TStyledButtonProps>`
  ${({ $size }) => SIZES[$size]}
  ${({ $variant }) => VARIANTS[$variant]}

  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-weight: ${({ theme, $fontWeight }) => ($fontWeight ? theme.fontWeight[$fontWeight] : theme.fontWeight.normal)};
  cursor: pointer;
`;
