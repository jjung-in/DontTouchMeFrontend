import styled from 'styled-components';

export const TagInput = styled.div<{ $isFocused?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 7px;
  padding: 10px 15px;
  border: ${({ $isFocused }) => ($isFocused ? '1px solid #000000' : '1px solid #d9d9d9')};
  border-radius: 5px;
  cursor: text;

  input {
    width: ${({ $isFocused }) => ($isFocused ? '100%' : '0px')};
  }
`;
