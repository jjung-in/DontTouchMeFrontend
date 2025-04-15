import styled from 'styled-components';

export const NumberInputWrapper = styled.div<{ $unit?: string; $isError?: boolean }>`
  position: relative;

  &::after {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    content: '${({ $unit }) => $unit ?? ''}';
  }
`;
