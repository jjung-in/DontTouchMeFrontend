import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 50px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 130px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-radius: 10px;
`;

export const Text = styled.span`
  margin-bottom: 15px;
`;

export const Amount = styled.span`
  font-size: 24px;
  font-weight: 600;
`;
