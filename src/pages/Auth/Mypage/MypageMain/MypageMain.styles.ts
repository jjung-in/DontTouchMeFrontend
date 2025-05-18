import { MainStyle } from '@_styles/common';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 5vh;
`;

export const Button = styled.button`
  width: 200px;
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.primary[500]};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    text-decoration: none;
    border-color: ${({ theme }) => theme.color.gray[100]};
    cursor: default;
  }
`;
