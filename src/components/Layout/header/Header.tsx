import * as S from './Header.ts';
import logo from '@_assets/images/Logo.png';
import textLogo from '@_assets/images/TextLogo.png';
import { useAuthStore } from '@_store/authStore.ts';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <S.HeaderWrapper>
      <S.HeaderInner>
        <S.Logo to={isLoggedIn ? 'events' : '/'}>
          <img src={logo} alt="PAYble 로고" />
          <img src={textLogo} alt="PAYble 텍스트 로고" />
        </S.Logo>
        <S.Nav>
          <S.NavLink to="/">About</S.NavLink>
          <S.NavLink to="/events">Event</S.NavLink>
          {isLoggedIn ? (
            <>
              <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
              <S.CreateLink to="/events/create">이벤트 만들기 →</S.CreateLink>
            </>
          ) : (
            <S.LoginLink to="/login">Login</S.LoginLink>
          )}
        </S.Nav>
      </S.HeaderInner>
    </S.HeaderWrapper>
  );
};

export default Header;
