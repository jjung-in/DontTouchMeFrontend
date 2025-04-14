import { css } from 'styled-components';

export const TitleStyle = css`
  color: ${({ theme }) => theme.color.text.black};
  font-size: 48px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  span {
    color: ${({ theme }) => theme.color.text.primary};
  }
`;

export const SubtitleStyle = css`
  color: ${({ theme }) => theme.color.text.black};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
