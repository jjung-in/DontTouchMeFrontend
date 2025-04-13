import styled from 'styled-components';
import arrow from '@_assets/icons/arrow-down.png';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Input = styled.input<{ $isShowArrow?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: right 15px center;
  ${({ $isShowArrow }) => $isShowArrow && `background-image: url(${arrow}); cursor: default;`}

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.gray[300]};
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  min-width: 110px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-radius: 5px;
  background-color: #ffffff;
  overflow-y: auto;
  z-index: 1000;
`;

export const Option = styled.li<{ $focused?: boolean; $selected?: boolean }>`
  padding: 8px 15px;
  color: ${({ theme, $selected }) => ($selected ? theme.color.text.white : 'inherit')};
  background: ${({ $selected, $focused }) => ($selected ? '#0a84ff' : $focused ? '#f0f0f0' : 'inherit')};
  border-radius: 5px;
  cursor: default;

  &:hover {
    background: ${({ $selected }) => ($selected ? '#0a84ff' : '#f0f0f0')};
  }
`;
