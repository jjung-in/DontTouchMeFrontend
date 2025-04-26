import styled from 'styled-components';

export const GridCell = styled.div`
  display: flex;
  align-items: start;
  padding: 10px 5px;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
`;
