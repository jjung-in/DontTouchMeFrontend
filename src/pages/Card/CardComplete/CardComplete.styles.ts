import { MainStyle, SubtitleStyle, TitleStyle } from '@_styles/common';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  justify-content: center;
  padding-top: 300px;
  padding-bottom: 200px;
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const Title = styled.h2`
  ${TitleStyle}
  margin: 35px 0;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const SubTitle = styled.p`
  ${SubtitleStyle}
  margin-bottom: 40px;
`;

export const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  border-radius: 6px;
`;
