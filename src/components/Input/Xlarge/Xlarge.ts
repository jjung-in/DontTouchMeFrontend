import styled from 'styled-components';

export const Input = styled.textarea`
  width: 301px;
  height: 163px;
  padding: 10px;
  resize: none;
  outline: none;

  background: ${({ theme }) => theme.color.primary[50]};
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-radius: 5px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.text.gray};
`;
