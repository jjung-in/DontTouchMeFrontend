import styled from 'styled-components';

export const Button = styled.button`
width: 145px;
height: 40px;

background: ${({ theme }) => theme.color.primary[50]};
border: 1px solid ${({ theme }) => theme.color.primary[500]};
border-radius: 9px;

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 15px;

color: ${({ theme }) => theme.text.black};
`;