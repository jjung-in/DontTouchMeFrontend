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
  padding: 5rem;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
`;

export const CloseImg = styled.img`
  position: fixed;
  top: calc(50% - 400px + 38px);
  left: calc(50% + 700px - 76px);
  width: 33px;
  height: 33px;
  cursor: pointer;
  z-index: 100;
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

export const Caption = styled.p<{ fontWeight?: 'bold' | 'normal'; color?: 'black' | 'red' }>`
  font-size: ${({ theme }) => theme.fontSize['xl']};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ color, theme }) => (color ? theme.color.text[color] : theme.color.text.black)};
  margin-bottom: 0.3rem;
`;

export const UnorderedTermsList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
`;

export const OrderedTermsList = styled.ol`
  list-style-type: decimal;
  padding-left: 1.5rem;
`;

export const TermsItem = styled.li<{ fontWeight?: 'bold' | 'normal' }>`
  font-size: ${({ theme }) => theme.fontSize['xl']};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ theme }) => theme.color.text.black};
  margin-bottom: 0.3rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const CloseButton = styled.button`
  width: 145px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.primary[500]};
  color: ${({ theme }) => theme.color.text.white};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize['xl']};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  cursor: pointer;
`;