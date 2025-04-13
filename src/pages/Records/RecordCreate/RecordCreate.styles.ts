import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isEmpty ? 'center' : 'flex-start')};
  align-items: center;
  gap: ${(props) => (props.$isEmpty ? '30px' : '0')};
  background-color: #e4f0fa;
`;

export const Title = styled.h2`
  margin-bottom: 35px;
  color: #3959a5;
  font-size: 48px;
  font-weight: 600;
`;

export const SubTitle = styled.p`
  margin-bottom: 70px;
  font-size: 20px;
`;
