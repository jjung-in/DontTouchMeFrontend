import styled from 'styled-components';

export const Wrapper = styled.div<{ $isError?: boolean }>`
  position: relative;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.color.primary[500]};
  }

  input {
    width: 100%;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.color.gray[100]};
    border-color: ${({ theme, $isError }) => ($isError ? theme.color.error : theme.color.gray[100])};
    border-radius: 5px;
  }

  input:focus {
    border-color: ${({ theme, $isError }) => ($isError ? theme.color.error : theme.color.gray[300])};
  }
`;

export const Icon = styled.img`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
`;
