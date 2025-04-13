import styled from 'styled-components';

export const TagInput = styled.div<{ $isFocused?: boolean; $isError?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 7px;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-color: ${({ theme, $isFocused, $isError }) =>
    $isError ? theme.color.error : $isFocused ? theme.color.gray[300] : theme.color.gray[100]};
  border-radius: 5px;
  cursor: text;

  input {
    width: ${({ $isFocused }) => ($isFocused ? '100%' : '0px')};
  }
`;
