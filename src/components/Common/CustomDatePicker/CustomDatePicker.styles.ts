import styled from 'styled-components';

export const Wrapper = styled.div<{ $isError?: boolean }>`
  position: relative;

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

  ${({ theme }) => {
    const gray = theme.color.gray;
    const primary = theme.color.primary;

    return `
      .react-datepicker {
        border-color: ${gray[100]};
      }
        
      .react-datepicker-wrapper {
        width: 100%;
      }
        
      .react-datepicker__header {
        background-color: ${primary[200]};
        border-bottom-color: ${gray[100]};
      }
      
      .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
        fill: ${primary[200]};
        color: ${primary[200]};
        stroke: ${gray[100]};
      }
        
      .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle {
        stroke: ${gray[100]};
      }
        
      .react-datepicker__day--selected {
        background-color: ${primary[500]};
      }
        
      .react-datepicker__day--keyboard-selected,
      .react-datepicker__month-text--keyboard-selected,
      .react-datepicker__quarter-text--keyboard-selected,
      .react-datepicker__year-text--keyboard-selected {
        background-color: ${primary[200]};
      }
        
      .react-datepicker__navigation-icon::before,
      .react-datepicker__year-read-view--down-arrow,
      .react-datepicker__month-read-view--down-arrow,
      .react-datepicker__month-year-read-view--down-arrow {
        border-color: ${gray[100]};
      }
    `;
  }}
`;

export const Icon = styled.img`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
`;
