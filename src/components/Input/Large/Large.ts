import styled from 'styled-components';

export const Input = styled.input`
  width: 311px;
  height: 41px;
  background-color: ${({ theme }) => theme.primary[50]};
  border: 1px solid ${({ theme }) => theme.gray[100]};
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
`;
