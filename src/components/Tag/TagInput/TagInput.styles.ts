import styled, { css } from 'styled-components';

export const TagInput = styled.div<{ $isFocused?: boolean; $isError?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 7px;
  padding: 10px 15px;
  border: ${({ $isFocused }) => ($isFocused ? '1px solid #000000' : '1px solid #d9d9d9')};
  border-radius: 5px;
  cursor: text;
  ${({ $isError }) =>
    $isError &&
    css`
      border-color: #ff3a44;
    `}

  input {
    width: ${({ $isFocused }) => ($isFocused ? '100%' : '0px')};
  }
`;
