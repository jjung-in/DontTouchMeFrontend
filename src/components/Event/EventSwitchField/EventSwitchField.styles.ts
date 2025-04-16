import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label<{ $isReadonly?: boolean }>`
  color: ${({ theme, $isReadonly }) => ($isReadonly ? theme.color.text.gray : 'inherit')};
`;
