import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  20%, 80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Container = styled.div<{ $type: string }>`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 20px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;

  animation: ${fadeInOut} 3s ease-in-out;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${({ theme, $type }) => ($type === 'success' ? theme.color.plus.green : theme.color.error)};

    img {
      width: 16px;
    }
  }
`;
