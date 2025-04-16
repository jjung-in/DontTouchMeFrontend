import { MainStyle } from '@_styles/common';
import { FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 75px;
  width: 900px;
  padding: 100px 100px 50px 210px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 140px;
`;

export const FieldArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const FieldContainer = styled(FieldContainerStyle)<{ $hasButton?: boolean }>`
  padding-right: ${({ $hasButton }) => ($hasButton ? '0' : '110px')};
`;

export const FieldLabel = styled(FieldLabelStyle)<{ $hasButton?: boolean }>`
  padding-right: ${({ $hasButton }) => ($hasButton ? '110px' : '0')};
`;

export const FieldInnerContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const FieldButton = styled.button`
  width: 100px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  border: 1px solid ${({ theme }) => theme.color.gray[300]};
  border-radius: 6px;

  &:disabled {
    border-color: ${({ theme }) => theme.color.gray[100]};
  }
`;

export const HintText = styled.p`
  color: ${({ theme }) => theme.color.gray[200]};
`;

export const ButtonArea = styled.div`
  padding-right: 110px;
`;
