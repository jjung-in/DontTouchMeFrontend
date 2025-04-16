import { useSignUpFlow } from '@_hooks/useAuth';
import * as S from './SignUp.styles';
import required from '@_assets/images/required.png';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { ErrorTextStyle } from '@_styles/event';
import Input from '@_components/Common/Input/Input';
import Button from '@_components/Common/Button/Button';
import AgreementSection from '@_components/Auth/AgreementSection/AgreementSection';

const SIGNUP_TITLE = {
  title: '회원가입',
  highlight: '회원가입',
  subtitle: '회원가입하여 모든 서비스를 이용해보세요!',
};

const SignUp = () => {
  const {
    formValues,
    formErrors,
    verificationMessage,
    isVerificationRequested,
    isVerificationSuccess,
    agreements,
    handleChange,
    handleRequestEmailCode,
    handleVerifyEmailCode,
    handleAgreementChange,
    handleSignUp,
  } = useSignUpFlow();

  return (
    <S.Main>
      <PageTitle {...SIGNUP_TITLE} />
      <S.SignUpForm onSubmit={handleSignUp}>
        <S.FieldArea>
          <S.FieldContainer>
            <S.FieldLabel>
              이름
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              maxLength={10}
              placeholder="이름을 입력하세요"
              autoComplete="off"
              state={formErrors.name ? 'error' : 'default'}
            />
            {formErrors.name && <ErrorTextStyle>{formErrors.name}</ErrorTextStyle>}
          </S.FieldContainer>
          <S.FieldContainer $hasButton={true}>
            <S.FieldLabel $hasButton={true}>
              이메일
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <S.FieldInnerContainer>
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                maxLength={30}
                placeholder="이메일을 입력하세요"
                state={formErrors.email ? 'error' : 'default'}
              />
              <S.FieldButton type="button" onClick={handleRequestEmailCode}>
                인증요청
              </S.FieldButton>
            </S.FieldInnerContainer>
            <S.FieldInnerContainer>
              <Input
                type="text"
                name="verificationCode"
                value={formValues.verificationCode}
                onChange={handleChange}
                placeholder="인증번호를 입력하세요"
                autoComplete="off"
                disabled={!isVerificationRequested || isVerificationSuccess}
                state={formErrors.verificationCode ? 'error' : 'default'}
                fullWidth={true}
              />
              <S.FieldButton
                type="button"
                onClick={handleVerifyEmailCode}
                disabled={!isVerificationRequested || isVerificationSuccess}
              >
                확인
              </S.FieldButton>
            </S.FieldInnerContainer>
            {formErrors.email ? (
              <ErrorTextStyle>{formErrors.email}</ErrorTextStyle>
            ) : formErrors.verificationCode ? (
              <ErrorTextStyle>{formErrors.verificationCode}</ErrorTextStyle>
            ) : (
              verificationMessage && <ErrorTextStyle $isSuccess={true}>{verificationMessage}</ErrorTextStyle>
            )}
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>
              비밀번호
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              maxLength={20}
              placeholder="비밀번호를 입력하세요"
              autoComplete="new-password"
              state={formErrors.password ? 'error' : 'default'}
            />
            {formErrors.password ? (
              <ErrorTextStyle>{formErrors.password}</ErrorTextStyle>
            ) : (
              <S.HintText>비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.</S.HintText>
            )}
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>
              비밀번호 확인
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              maxLength={20}
              placeholder="비밀번호를 다시 입력하세요"
              autoComplete="new-password"
              state={formErrors.confirmPassword ? 'error' : 'default'}
            />
            {formErrors.confirmPassword && <ErrorTextStyle>{formErrors.confirmPassword}</ErrorTextStyle>}
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>
              연락처
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="tel"
              name="contact"
              value={formValues.contact}
              onChange={handleChange}
              maxLength={20}
              placeholder="연락처를 입력하세요"
              autoComplete="off"
              state={formErrors.contact ? 'error' : 'default'}
            />
            {formErrors.contact && <ErrorTextStyle>{formErrors.contact}</ErrorTextStyle>}
          </S.FieldContainer>
        </S.FieldArea>
        <AgreementSection values={agreements} onChange={handleAgreementChange} />
        <S.ButtonArea>
          <Button type="submit" variant="primary" fontWeight="semibold" fullWidth={true}>
            회원가입
          </Button>
        </S.ButtonArea>
      </S.SignUpForm>
    </S.Main>
  );
};

export default SignUp;
