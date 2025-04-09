import * as S from './Header.ts';
import logo from '@_assets/images/Logo.png';
import textLogo from '@_assets/images/TextLogo.png';

const Header = () => {
  return (
    <S.HeaderWrapper>
      <S.HeaderInner>
        <S.Logo to="/">
          <img src={logo} alt="PAYble 로고" />
          <img src={textLogo} alt="PAYble 텍스트 로고" />
        </S.Logo>
        <S.Nav>
          <S.NavLink to="/about">About</S.NavLink>
          <S.NavLink to="/events">Event</S.NavLink>
          {/* <S.LoginLink to="/login">Login</S.LoginLink> */}
          <S.LogoutButton>Logout</S.LogoutButton>
          <S.CreateLink to="/events/create">이벤트 만들기 →</S.CreateLink>
        </S.Nav>
      </S.HeaderInner>
    </S.HeaderWrapper>
  );
};

export default Header;
