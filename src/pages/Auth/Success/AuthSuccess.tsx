import * as S from './AuthSuccess.styles';
import fire from '@_assets/icons/fire.png';

const AuthSuccess = () => {
  return (
    <S.Main>
      <S.FieldArea>
        <img src={fire} alt="인증 완료" />
        <S.FieldContainer>
          <S.FieldLabel>가입을 축하드립니다.</S.FieldLabel>
          <S.FieldLabel>지금 바로 로그인하여 서비스를 이용해보세요!</S.FieldLabel>
        </S.FieldContainer>
        <S.LogInButton onClick={() => (window.location.href = '/login')}>로그인 →</S.LogInButton>
      </S.FieldArea>
    </S.Main>
  );
};

export default AuthSuccess;
