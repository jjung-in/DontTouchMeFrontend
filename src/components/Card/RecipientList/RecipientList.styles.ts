import { TitleStyle } from '@_styles/common';
import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const Title = styled.h2`
  ${TitleStyle}
  margin-bottom: 35px;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const RecipientBox = styled.div<{ $isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 450px;
  height: 600px;
  padding: 50px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      justify-content: center;
    `}
`;

export const RecipientList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray[100]};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.gray[200]};
  }
`;

export const RecipientItem = styled.label<{ $disabled: boolean }>`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    position: relative;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border: 2px solid ${({ theme }) => theme.color.gray[100]};
    border-radius: 5px;
    appearance: none;

    &:checked {
      border-color: ${({ theme }) => theme.color.primary[500]};
      background-color: ${({ theme }) => theme.color.primary[500]};
    }

    &:checked::after {
      position: absolute;
      content: '';
      top: 3px;
      left: 7px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    ${({ $disabled, theme }) =>
      !$disabled &&
      css`
        &:hover {
          border-color: ${theme.color.primary[500]};
        }

        &:checked:hover {
          border-color: ${theme.color.gray[100]};
        }
      `}
  }
`;

export const ButtonGroup = styled.div``;
