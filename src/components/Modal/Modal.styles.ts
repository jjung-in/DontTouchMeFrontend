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

export const Container = styled.div`
  position: relative;
  width: 750px;
  padding: 70px 40px 40px;
  border: 1px solid #000000;
  border-radius: 10px;
  background: #ffffff;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 30px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
`;
