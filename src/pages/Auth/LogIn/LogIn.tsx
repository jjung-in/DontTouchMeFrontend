import Button from '@_components/Common/Button/Button';
import Input from '@_components/Common/Input/Input';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { useLogInFlow } from '@_hooks/useAuth';
import { ErrorTextStyle } from '@_styles/event';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LogIn.styles';
import AlertModal from '@_components/Modal/AlertModal/AlertModal';

const LOGIN_TITLE = {
  title: '로그인',
  highlight: '로그인',
  subtitle: '이메일과 비밀번호를 입력해주세요',
};

const LogIn = () => {
  const {
    formValues,
    formErrors,
    handleChange,
    handleLogIn,
    handleTestLogIn,
    isPending,
  } = useLogInFlow();
  const navigate = useNavigate();
  const [isTestModalOpen, setTestModalOpen] = useState(false);

  const handleConfirmTestLogin = () => {
    handleTestLogIn();
    setTestModalOpen(false);
  };

  return (
    <>
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

          <S.ButtonArea>
            <Button
              type="button"
              variant="primary"
              fontWeight="semibold"
              fullWidth
              onClick={() => setTestModalOpen(true)}
            >
              테스트 계정으로 로그인
            </Button>
          </S.ButtonArea>

          <S.SignUpLinkArea>
            <Button
              type="button"
              variant="secondary"
              fontWeight="semibold"
              fullWidth
              onClick={() => navigate('/signup')}
            >
              회원가입
            </Button>
          </S.SignUpLinkArea>
        </S.LogInForm>
      </S.Main>
      {isTestModalOpen && (
        <AlertModal
          isOpen={isTestModalOpen}
          onClose={() => setTestModalOpen(false)}
          title="테스트 계정 사용"
          message={`테스트 계정을 사용하여 로그인 시 일부 기능이 제한될 수 있습니다.\n진행하시겠습니까?`}
          onConfirm={handleConfirmTestLogin}
        />
      )}
    </>
  );
};

export default LogIn;
