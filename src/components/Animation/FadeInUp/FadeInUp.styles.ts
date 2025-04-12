import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FadeInUpWrapper = styled.div<{ $visible: boolean; $delay: number }>`
  opacity: 0;
  animation: ${({ $visible }) => ($visible ? fadeInUp : 'none')} 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay}s;
`;
