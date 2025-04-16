import styled, { keyframes } from 'styled-components';

const float = (distance: number) => keyframes`
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-${distance}px); }
  100% { transform: translateY(0px); }
`;

export const FloatingWrapper = styled.div<{ $duration: number; $delay: number; $distance: number }>`
  display: inline-block;
  animation: ${({ $distance }) => float($distance)} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;
