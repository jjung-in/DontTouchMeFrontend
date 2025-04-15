import { MainStyle } from '@_styles/common';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  background-color: ${({ theme }) => theme.color.primary[200]};
`;
