import styled, { css } from 'styled-components';

export const MainStyle = css<{ $isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
  align-items: center;
`;

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

export const EmptyBoxStyle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const InfiniteScrollObserverStyle = styled.div`
  height: 1px;
`;

export const BoldTextStyle = styled.span`
  font-weight: bold;
`;
