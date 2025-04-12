import styled, { css, keyframes } from 'styled-components';

const rotateY = keyframes`
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
`;

export const RotateYWrapper = styled.div<{ $visible: boolean; $duration: number; $delay: number }>`
  perspective: 800px;

  & > * {
    ${({ $visible, $duration, $delay }) =>
      $visible &&
      css`
        animation: ${rotateY} ${$duration}s linear ${$delay}s forwards;
      `}
  }
`;
