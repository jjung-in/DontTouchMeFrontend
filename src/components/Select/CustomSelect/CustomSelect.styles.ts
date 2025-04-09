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
  border: 1px solid #cbd2e0;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-position: right 15px center;
  ${(props) => props.$isShowArrow && `background-image: url(${arrow}); cursor: default;`}

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    border-color: #000000;
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  min-width: 110px;
  padding: 5px;
  border: 1px solid #cbd2e0;
  border-radius: 6px;
  background-color: #ffffff;
  overflow-y: auto;
  z-index: 1000;
`;

export const Option = styled.li<{ $focused?: boolean; $selected?: boolean }>`
  padding: 8px 15px;
  color: ${(props) => (props.$selected ? '#ffffff' : 'inherit')};
  background: ${(props) => (props.$selected ? '#0a84ff' : props.$focused ? '#f0f0f0' : 'inherit')};
  border-radius: 6px;
  cursor: default;

  &:hover {
    background: ${(props) => (props.$selected ? '#0a84ff' : '#f0f0f0')};
  }
`;
