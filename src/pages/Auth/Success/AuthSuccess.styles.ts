import styled from 'styled-components';
import { MainStyle } from '@_styles/common';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const LogInButton = styled.button`
  width: 240px;
  height: 80px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: ${({ theme }) => theme.color.primary[500]};
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary[100]};
  }
`;

export const FieldArea = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 200px;
    height: 200px;
    margin-bottom: 40px;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

export const FieldLabel = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.color.primary[500]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
