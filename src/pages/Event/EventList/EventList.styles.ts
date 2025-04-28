import { EmptyBoxStyle, MainStyle } from '@_styles/common';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
`;

export const CardArea = styled.div`
  width: 100%;
  padding: 100px 0;
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const CardList = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 324px);
  justify-content: center;
  gap: 50px 60px;
`;

export const FetchingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

export const EmptyBox = styled(EmptyBoxStyle)`
  width: 100%;
  min-height: 300px;
  background-color: ${({ theme }) => theme.color.primary[200]};
`;
