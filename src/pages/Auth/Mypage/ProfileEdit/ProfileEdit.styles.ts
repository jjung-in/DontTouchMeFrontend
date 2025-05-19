import styled from 'styled-components';
import { MainStyle } from '@_styles/common';
import { FieldContainerStyle, FieldLabelStyle } from '@_styles/event';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 900px;
  padding: 100px 210px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const FieldArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const FieldContainer = styled(FieldContainerStyle)``;

export const FieldLabel = styled(FieldLabelStyle)``;

export const HintText = styled.p`
  color: ${({ theme }) => theme.color.gray[200]};
`;

export const ButtonArea = styled.div``;