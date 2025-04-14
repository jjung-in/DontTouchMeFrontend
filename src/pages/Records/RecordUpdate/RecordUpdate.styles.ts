import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isEmpty ? 'center' : 'flex-start')};
  align-items: center;
  gap: ${(props) => (props.$isEmpty ? '30px' : '0')};
  background-color: #e4f0fa;
`;

export const EmptyBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;
  background-color: #e4f0fa;
`;
