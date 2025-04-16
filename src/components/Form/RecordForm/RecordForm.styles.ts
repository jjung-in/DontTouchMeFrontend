import styled from 'styled-components';

export const Grid = styled.div<{ $gridTemplateColumns?: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$gridTemplateColumns};
  padding: 10px 20px;
  border-radius: 10px;
`;

export const GridCell = styled.div<{ $isHeader?: boolean }>`
  display: flex;
  align-items: start;
  padding: ${({ $isHeader }) => ($isHeader ? '10px 10px 15px' : '10px 5px')};
  font-weight: ${({ $isHeader }) => ($isHeader ? '600' : 'normal')};
`;

export const ButtonArea = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
`;
