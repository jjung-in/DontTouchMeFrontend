import { MainStyle } from '@_styles/layout';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  gap: ${($isEmpty) => ($isEmpty ? '30px' : '0')};
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const EmptyBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
`;
