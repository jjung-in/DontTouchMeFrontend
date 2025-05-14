import * as S from './Header.ts';
import logo from '@_assets/images/Logo.png';
import textLogo from '@_assets/images/TextLogo.png';
import { useAuthStore } from '@_store/authStore.ts';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <S.HeaderWrapper $isFixed={pathname === '/'}>
      <S.HeaderInner>
        <S.Logo to={isLoggedIn ? 'events' : '/'}>
          <img src={logo} alt="PAYble 로고" />
          <img src={textLogo} alt="PAYble 텍스트 로고" />
        </S.Logo>
        <S.Nav>
          <S.NavLink to="/">About</S.NavLink>
          {isLoggedIn ? (
            <>
              <S.NavLink to="/events">Event</S.NavLink>
              <S.NavLink to="/mypage">Mypage</S.NavLink>
              <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
              <S.CreateLink to="/events/create">이벤트 만들기 →</S.CreateLink>
              <S.AnchorButton
                href="https://docs.google.com/forms/d/e/1FAIpQLSfEy4i8o4JJLe9mQf2b6KHapaQxx52zaFx5pYBMUmQ98ISbLQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                피드백 남기기 →
              </S.AnchorButton>
            </>
          ) : (
            <>
              <S.LoginLink to="/login">Login</S.LoginLink>
              <S.CreateLink to="/events/create">이벤트 만들기 →</S.CreateLink>
            </>
          )}
        </S.Nav>
      </S.HeaderInner>
    </S.HeaderWrapper>
  );
};

export default Header;
