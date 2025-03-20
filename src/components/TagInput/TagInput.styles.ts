import styled from 'styled-components';

export const TagInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px 5px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: text;
`;

export const Input = styled.input<{ $isFocused?: boolean }>`
  width: ${({ $isFocused }) => ($isFocused ? '100%' : '0px')};
  border: none;
  outline: none;
`;
