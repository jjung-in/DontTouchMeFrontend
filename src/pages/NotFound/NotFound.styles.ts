import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding-left: 150px;
  padding-bottom: 200px;
  background-color: #e4f0fa;
`;

export const ErrorCode = styled.p`
  font-size: 48px;
  font-weight: 700;
`;

export const ErrorMessage = styled.p`
  font-size: 18px;
  color: #666666;
  margin-top: 30px;
  margin-bottom: 40px;
  line-height: 1.5;
`;
