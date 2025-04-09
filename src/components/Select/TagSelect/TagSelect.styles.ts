import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const SelectBox = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px 7px;
  width: 100%;
  height: 100%;
  padding: 0 14px;
  border: 1px solid #cbd2e0;
  border-radius: 6px;
  background-color: #ffffff;
  overflow-x: auto;
  ${(props) => props.$focused && `border-color: #000000;`}

  &:focus {
    outline: none;
    border: 1px solid #000000;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd2e0;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #e4f0fa;
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
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
