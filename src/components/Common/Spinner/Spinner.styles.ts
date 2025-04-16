import styled from 'styled-components';

export const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 5px solid transparent;
  border-top-color: ${({ theme }) => theme.color.primary[500]};
  border-radius: 50%;
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
