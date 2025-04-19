import { useLogInFlow } from '@_hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import * as S from './LogIn.styles';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import Input from '@_components/Common/Input/Input';
import Button from '@_components/Common/Button/Button';
import { ErrorTextStyle } from '@_styles/event';
import google from '@_assets/icons/google.png';
import naver from '@_assets/icons/naver.png';

const LOGIN_TITLE = {
  title: '로그인',
  highlight: '로그인',
  subtitle: '이메일과 비밀번호를 입력해주세요',
};

const LogIn = () => {
  const { formValues, formErrors, handleChange, handleLogIn, handleNaverClick, handleGoogleClick, isPending } = useLogInFlow();
  const navigate = useNavigate();

  return (
    <S.Main>
      <PageTitle {...LOGIN_TITLE} />
      <S.LogInForm onSubmit={handleLogIn}>
        <S.FieldArea>
          <S.FieldContainer>
            <S.FieldLabel>이메일</S.FieldLabel>
            <Input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              state={formErrors.email ? 'error' : 'default'}
              autoComplete="off"
              fullWidth
            />
            {formErrors.email && <ErrorTextStyle>{formErrors.email}</ErrorTextStyle>}
          </S.FieldContainer>

          <S.FieldContainer>
            <S.FieldLabel>비밀번호</S.FieldLabel>
            <Input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              state={formErrors.password ? 'error' : 'default'}
              autoComplete="current-password"
              fullWidth
            />
            {formErrors.password && <ErrorTextStyle>{formErrors.password}</ErrorTextStyle>}
          </S.FieldContainer>
          <S.ForgotPasswordText>비밀번호를 잊으셨나요?</S.ForgotPasswordText>
        </S.FieldArea>

        <S.ButtonArea>
          <Button type="submit" variant="primary" fontWeight="semibold" fullWidth disabled={isPending}>
            로그인
          </Button>
        </S.ButtonArea>

        <S.SignUpLinkArea>
          <Button type="button" variant="outlined" fontWeight="semibold" fullWidth onClick={() => navigate('/signup')}>
            회원가입
          </Button>
        </S.SignUpLinkArea>

        <S.SocialLoginWrapper>
          <S.SocialLoginDivider>
            <span>소셜 로그인</span>
          </S.SocialLoginDivider>
          <S.SocialIconContainer>
          <img src={google} alt="google login" onClick={handleGoogleClick} />
          <img src={naver} alt="naver login" onClick={handleNaverClick} />
          </S.SocialIconContainer>
        </S.SocialLoginWrapper>
      </S.LogInForm>
    </S.Main>
  );
};

export default LogIn;
