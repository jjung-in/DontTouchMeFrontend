import { TitleStyle } from '@_styles/common';
import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  ${TitleStyle}
  margin-bottom: 35px;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const MessageTitle = styled.div`
  height: 70px;
  line-height: 30px;
  margin-bottom: 45px;
  padding: 20px 50px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

export const MessageContent = styled.div<{ $isEmpty?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${({ $isEmpty }) => $isEmpty && 'justify-content: center'};
  align-items: center;
  padding: 50px 50px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.7;
`;

export const HighlightText = styled.span`
  color: ${({ theme }) => theme.color.primary[500]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
