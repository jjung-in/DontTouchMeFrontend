import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isEmpty ? 'center' : 'flex-start')};
  align-items: center;
  gap: ${(props) => (props.$isEmpty ? '30px' : '0')};
  background-color: #e4f0fa;
`;

export const Title = styled.h2`
  margin-bottom: 35px;
  color: #3959a5;
  font-size: 48px;
  font-weight: 600;
`;

export const SubTitle = styled.p`
  margin-bottom: 70px;
  font-size: 20px;
`;

interface ButtonProps {
  $fontWeight?: string | number;
  $textColor?: string;
  $bgColor?: string;
  $borderColor?: string;
}

const BaseButtonStyle = css<ButtonProps>`
  padding: 15px 30px;
  font-weight: ${(props) => props.$fontWeight || 600};
  color: ${(props) => props.$textColor || 'inherit'};
  background: ${(props) => props.$bgColor || 'white'};
  border: ${(props) => props.$borderColor && `1px solid ${props.$borderColor}`};
  border-radius: 6px;
`;

export const LinkButton = styled(Link)<ButtonProps>`
  ${BaseButtonStyle}
`;
