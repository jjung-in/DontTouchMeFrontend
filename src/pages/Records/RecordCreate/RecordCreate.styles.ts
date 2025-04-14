import { MainStyle } from '@_styles/common';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  gap: ${(props) => (props.$isEmpty ? '30px' : '0')};
  background-color: #e4f0fa;
`;
