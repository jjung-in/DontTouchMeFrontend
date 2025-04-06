import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 16px);
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
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  background-color: #f1f3f7;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NoImage = styled.img``;

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

export const ReadOnlyText = styled.span`
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

export const ReadOnlyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const BaseButtonStyle = css<{ $textColor?: string; $bgColor?: string; $borderColor?: string }>`
  padding: 15px 30px;
  font-weight: 600;
  color: ${(props) => props.$textColor || 'inherit'};
  background: ${(props) => props.$bgColor || 'white'};
  border: ${(props) => props.$borderColor && `1px solid ${props.$borderColor}`};
  border-radius: 6px;
`;

export const Button = styled.button<{ $textColor?: string; $bgColor?: string; $borderColor?: string }>`
  ${BaseButtonStyle}
`;

export const LinkButton = styled(Link)<{ $textColor?: string; $bgColor?: string; $borderColor?: string }>`
  ${BaseButtonStyle}
`;
