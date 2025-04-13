import styled from 'styled-components';

interface SwitchStyleProps {
  checked: boolean;
}

export const SwitchContainer = styled.div<{ $checked: boolean }>`
  width: 40px;
  height: 24px;
  border-radius: 9999px;
  background-color: ${({ theme, $checked }) => ($checked ? theme.color.primary[500] : theme.color.gray[100])};
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
  background-color: ${({ theme }) => theme.color.primary[100]};
  transition: left 0.2s ease;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;
