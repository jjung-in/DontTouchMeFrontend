import * as S from './Header.ts';

const Header = () => {
  return (
    <S.Topbar>
      <S.LogoImg src="src/assets/images/Logo.png" alt="Logo" />
      <S.TextLogoImg src="src/assets/images/TextLogo.png" alt="Text Logo" />
      <S.CreateButton>이벤트 만들기 →</S.CreateButton>
      <S.LogoutButton>Logout</S.LogoutButton>
      <S.HeaderText1>Event</S.HeaderText1>
      <S.HeaderText2>About</S.HeaderText2>
    </S.Topbar>
  );
};

export default Header;