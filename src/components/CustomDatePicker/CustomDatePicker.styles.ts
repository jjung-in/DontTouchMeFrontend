import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__day--selected {
    background-color: #3959a5;
  }

  input {
    width: 100%;
    padding: 15px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
  }

  input:focus {
    border-color: #000000;
  }
`;

export const Icon = styled.img`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
`;
