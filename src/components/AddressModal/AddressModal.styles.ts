import styled from 'styled-components';

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

export const ModalContainer = styled.div`
  position: relative;
  padding: 50px 40px 40px;
  border-radius: 10px;
  background: #ffffff;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 30px;
  cursor: pointer;
`;
