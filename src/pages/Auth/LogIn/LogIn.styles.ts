import styled from 'styled-components';
import { MainStyle } from '@_styles/common';
import { FieldContainerStyle, FieldLabelStyle } from '@_styles/event';

export const Main = styled.main`
  ${MainStyle}
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const LogInForm = styled.form`
  display: flex;
  flex-direction: column;
  /* gap: 75px; */
  width: 900px;
  padding: 100px 100px 50px 210px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.primary[50]};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const FieldArea = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 70px;
`;

export const ForgotPasswordText = styled.span`
  display: inline-block;
  margin-top: 25px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.primary[400]};
  text-decoration: underline;
  cursor: pointer;
`;

export const FieldContainer = styled(FieldContainerStyle)`
  padding-right: 110px;
`;

export const FieldLabel = styled(FieldLabelStyle)``;

export const ButtonArea = styled.div`
  padding-right: 110px;
`;

export const SignUpLinkArea = styled.div`
  padding-right: 110px;
  margin-top: 20px;
  display: flex;
  gap: 10px;
  font-size: 14px;

  a {
    color: ${({ theme }) => theme.color.primary[400]};
    text-decoration: underline;
  }
`;

export const SocialLoginWrapper = styled.div`
  margin-top: 100px;
  padding-right: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SocialLoginDivider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.gray[500]};
  font-size: 14px;
  margin-bottom: 15px;

  span {
    padding: 0 10px;
    white-space: nowrap;
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.color.gray[200]};
  }
`;

export const SocialIconContainer = styled.div`
  display: flex;
  gap: 45px;

  img {
    margin-top : 45px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;