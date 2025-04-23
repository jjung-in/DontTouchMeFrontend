import styled from 'styled-components';

export const Button = styled.button`

position: absolute;
width: 240px;
height: 80px;

background: ${({ theme }) => theme.color.primary[50]};
border-radius: 12px;
border: none;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 32px;
line-height: 20px;
text-align: center;
color: ${({ theme }) => theme.text.primary};
`;
