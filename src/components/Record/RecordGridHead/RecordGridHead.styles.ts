import styled from 'styled-components';

export const GridCell = styled.div<{ $isHeader?: boolean }>`
  display: flex;
  align-items: start;
  padding: 10px 10px 15px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
