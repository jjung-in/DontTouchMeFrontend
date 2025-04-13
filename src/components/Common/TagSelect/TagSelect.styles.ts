import styled, { css } from 'styled-components';

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
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-radius: 5px;
  background-color: #ffffff;
  overflow-x: auto;

  ${({ $focused }) =>
    $focused &&
    css`
      border-color: ${({ theme }) => theme.color.gray[300]};

      &:focus {
        outline: none;
        border: 1px solid ${({ theme }) => theme.color.gray[300]};
      }
    `}

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray[100]};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.primary[200]};
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
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
