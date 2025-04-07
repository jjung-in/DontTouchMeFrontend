import styled from 'styled-components';

interface SwitchStyleProps {
  checked: boolean;
}

export const Container = styled.div<{ $checked: boolean }>`
  width: 40px;
  height: 24px;
  border-radius: 9999px;
  background-color: #ccc;
  background-color: ${(props) => (props.$checked ? '#3959a5' : '#d9d9d9')};
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

export const SwitchHandle = styled.div<SwitchStyleProps>`
  position: absolute;
  top: 2px;
  left: ${({ checked }) => (checked ? '18px' : '2px')};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  transition: left 0.2s ease;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;
