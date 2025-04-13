import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import arrow from '@_assets/icons/arrow-down.png';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e4f0fa;
`;

export const Title = styled.h2`
  margin-bottom: 35px;
  color: #3959a5;
  font-size: 48px;
  font-weight: 600;
`;

export const SubTitle = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 1000px;
  padding: 100px 100px 50px 100px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const FormArea = styled.div`
  display: flex;
  gap: 140px;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 250px;
`;

export const Thumbnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  background-color: #f1f3f7;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NoImage = styled.img``;

// Field Styles

export const FieldSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: start;
  font-size: 20px;
`;

const BaseFieldStyle = css<{ $isError?: boolean }>`
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  ${({ $isError }) =>
    $isError &&
    css`
      border-color: #ff3a44;
    `}

  &:focus {
    border-color: ${({ $isError }) => ($isError ? '#ff3a44' : '#000000')};
  }
`;

export const Input = styled.input<{ $isError?: boolean }>`
  ${BaseFieldStyle}

  &::placeholder {
    color: #9d9d9d;
  }
`;

export const NumberInput = styled.div<{ $isError?: boolean }>`
  position: relative;

  input {
    ${BaseFieldStyle}
    width: 100%;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &::after {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    content: '명';
  }
`;

export const Select = styled.select<{ $isError?: boolean }>`
  ${BaseFieldStyle}
  padding: 18px 15px;
  appearance: none;
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-position: right 15px center;
`;

export const Text = styled.span<{ $isError?: boolean }>`
  ${BaseFieldStyle}
  appearance: none;
`;

export const TextBox = styled.div<{ $isError?: boolean }>`
  ${BaseFieldStyle}
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ErrorText = styled.span`
  color: #ff3a44;
`;

// Button Styles

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
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

export const FileButton = styled.div<ButtonProps>`
  ${BaseButtonStyle}
  cursor: pointer;
`;

// Detail Styles

export const DetailBox = styled.div<{ $isError?: boolean }>`
  ${BaseFieldStyle}
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px 30px;
`;

export const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailSwitchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DetailText = styled.span<{ $readonly?: boolean }>`
  color: ${(props) => (props.$readonly ? '#9d9d9d' : 'inherit')};
`;

export const DetailInput = styled.input<{ $isError?: boolean }>`
  ${BaseFieldStyle}
  width: 100%;
  margin-top: 10px;
`;

export const DetailSelect = styled.select<{ $isError?: boolean }>`
  ${BaseFieldStyle}
  appearance: none;
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-position: right 15px center;
`;
