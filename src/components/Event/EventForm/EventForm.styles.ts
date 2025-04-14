import { ErrorTextStyle } from '@_styles/event';
import styled from 'styled-components';

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

export const NumberInputWrapper = styled.div<{ $isError?: boolean }>`
  position: relative;

  &::after {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    content: '명';
  }
`;

export const ErrorText = styled.span`
  ${ErrorTextStyle}
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

// Detail Styles

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
