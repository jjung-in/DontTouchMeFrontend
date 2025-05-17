import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header<{ $isFixed: boolean }>`
  position: ${({ $isFixed }) => ($isFixed ? 'fixed' : 'absolute')};
  top: 50px;
  width: 100%;
  height: 100px;
  min-width: 1280px;
  padding: 0 100px;
  z-index: 1;
`;

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-left: 55px;
  padding-right: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 2px solid rgba(187, 218, 242, 0.4);
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;
`;

export const NavLink = styled(Link)`
  font-size: 24px;
  color: #6d758f;
`;

export const AnchorLink = styled.a`
  font-size: 24px;
  color: #6d758f;
`;

export const CreateLink = styled(Link)`
  padding: 18px 20px;
  font-size: 18px;
  font-weight: 600;
  color: #6d758f;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.color.primary[500]};
  border-radius: 12px;
`;

export const AnchorButton = styled.a`
  padding: 18px 20px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.white};
  background: ${({ theme }) => theme.color.primary[500]};
  border: 1px solid ${({ theme }) => theme.color.primary[500]};
  border-radius: 12px;
`;

const BaseButtonStyle = css`
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 700;
  color: #6d758f;
  background: #f8faff;
  border: 1px solid #e1e4ed;
  border-radius: 12px;
`;

export const LoginLink = styled(Link)`
  ${BaseButtonStyle}
`;

export const LogoutButton = styled.button`
  ${BaseButtonStyle}
`;
