import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import arrow from '@_assets/icons/arrow-down.png';

// Grid Styles

export const Grid = styled.div<{ $gridTemplateColumns?: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$gridTemplateColumns};
  padding: 10px 20px;
  border-radius: 10px;
`;

export const GridCell = styled.div<{ $isHeader?: boolean }>`
  display: flex;
  align-items: start;
  padding: ${({ $isHeader }) => ($isHeader ? '10px 10px 15px' : '10px 5px')};
  font-weight: ${({ $isHeader }) => ($isHeader ? '600' : 'normal')};
`;

const BaseFieldStyle = css`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border-radius: 6px;
  border: 1px solid #cbd2e0;
  background-color: #ffffff;

  &:focus {
    border-color: #000000;
  }
`;

export const Select = styled.select`
  ${BaseFieldStyle}
  appearance: none;
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-position: right 15px center;
`;

export const Input = styled.input`
  ${BaseFieldStyle}
`;

export const Text = styled.span`
  ${BaseFieldStyle}
  display: flex;
  align-items: center;
  padding: 15px;
`;

// Button Styles

export const ButtonArea = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
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

export const Button = styled.button<ButtonProps>`
  ${BaseButtonStyle}
`;

export const LinkButton = styled(Link)<ButtonProps>`
  ${BaseButtonStyle}
`;

export const ImportButton = styled.span<ButtonProps>`
  ${BaseButtonStyle}
  display: inline-block;
  cursor: pointer;
`;
