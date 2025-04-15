import styled from 'styled-components';

export const FieldContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FieldLabelStyle = styled.label`
  display: flex;
  justify-content: center;
  align-items: start;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

export const ErrorTextStyle = styled.p`
  color: ${({ theme }) => theme.color.error};
`;
