import styled from 'styled-components';

const sizeMap = {
  sm: { width: '360px', height: 'auto' },
  md: { width: '580px', height: 'auto' },
  lg: { width: '730px', height: '80vh' },
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Container = styled.div<{ $size?: 'sm' | 'md' | 'lg' }>`
  position: relative;
  width: 100%;
  max-width: ${({ $size = 'md' }) => sizeMap[$size].width};
  height: ${({ $size = 'md' }) => sizeMap[$size].height};
  max-height: 80vh;
  padding: 70px 40px 45px;
  border: 1px solid #000000;
  border-radius: 10px;
  background: #ffffff;
  text-align: center;
  overflow: hidden;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 30px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;
