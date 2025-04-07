import styled from 'styled-components';

const HeaderText = styled.h1`
  position: absolute;
  width: 76px;
  height: 21px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 22px;
  leading-trim: both;
  text-edge: cap;
  text-align: center;
  color: #6d758f;
  cursor: pointer;
`;

const ButtonBase = styled.button`
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Inter';
  font-style: normal;
`;

export const Topbar = styled.header`
  width: 1652px;
  height: 100px;
  border-radius: 12px;
  background: #ffffff;
  margin-top: 63px;
  margin-left: 134px;
`;

export const CreateButton = styled(ButtonBase)`
  position: absolute;
  left: 1594px;
  top: 86px;
  width: 157.04px;
  height: 57px;
  border: 1px solid #3959a5;
  background: #ffffff;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #6d758f;
`;

export const LogoutButton = styled(ButtonBase)`
  position: absolute;
  left: 1466px;
  top: 92px;
  width: 98px;
  height: 44px;
  border: 1px solid #e1e4ed;
  background: #f8faff;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  color: #6D758F;
`;

export const HeaderText1 = styled(HeaderText)`
  left: 1360px;
  top: 104px;
`;

export const HeaderText2 = styled(HeaderText)`
  left: 1266px;
  top: 104px;
`;

export const LogoImg = styled.img`
  position: absolute;
  width: 53px;
  height: 59px;
  left: 189px;
  top: 84px;
`;

export const TextLogoImg = styled.img`
  position: absolute;
  width: 108px;
  height: 25px;
  left: 254px;
  top: 103px;
`;