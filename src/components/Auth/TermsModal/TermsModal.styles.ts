import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  width: 1400px;
  height: 800px;
  background-color: #ffffff;
  padding: 3.75rem;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 38px;
  right: 38px;
  width: 33px;
  height: 33px;
  cursor: pointer;
`;

export const TextContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.text.black};
  margin-bottom: 0.3rem;
`;

export const Caption = styled.p<{ fontWeight?: 'bold' | 'normal'; color?: black | red }>`
  fontsize: 'xl';
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ color, theme }) => (color ? theme.color.text[color] : theme.color.text.black)};
  margin-bottom: 0.3rem;
`;

export const 