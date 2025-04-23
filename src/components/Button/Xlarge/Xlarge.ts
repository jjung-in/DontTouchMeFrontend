import styled from 'styled-components';

export const Button = styled.button`
  position: absolute;
  width: 311px;
  height: 41px;
  background: ${({ theme }) => theme.color.primary[500]};
  border-radius: 5px;
  border: none;

  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text.white};
`;