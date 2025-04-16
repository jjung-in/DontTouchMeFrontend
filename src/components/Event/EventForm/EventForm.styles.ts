import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 1000px;
  padding: 100px 100px 50px 100px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const FormArea = styled.div`
  display: flex;
  gap: 140px;
`;

export const FieldArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
