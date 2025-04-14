import { css } from 'styled-components';

export const MainStyle = css<{ $isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
  align-items: center;
`;
