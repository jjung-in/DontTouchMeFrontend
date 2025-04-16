import styled from 'styled-components';
import checked from '@_assets/icons/check-blue.png';
import unchecked from '@_assets/icons/check-gray.png';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 110px;
`;

export const Header = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: right;

  p {
    margin-bottom: 15px;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  a {
    margin-right: 20px;
    color: ${({ theme }) => theme.color.gray[200]};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AgreementList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const AgreementItem = styled.li<{ $isChecked: boolean }>`
  label {
    position: relative;
    padding-left: 40px;
    cursor: pointer;

    &::before {
      position: absolute;
      content: '';
      width: 24px;
      height: 24px;
      left: 0;
      top: 6px;
      background-image: ${({ $isChecked }) => `url(${$isChecked ? checked : unchecked})`};
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  input[type='checkbox'] {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
`;
