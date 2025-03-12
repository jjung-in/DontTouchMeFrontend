import { SignUpProps, LogInProps } from '@_types/auth.type';
import { instance } from '@_api/interface';

export const PostSignUp = async (): Promise<SignUpProps[]> => {
  try {
    const { data } = await instance.post(`/member/sign-up`);
    return data;
  } catch (error) {
    console.error('SignUp Error', error);
    throw new Error('회원가입 오류');
  }
};

export const PostLogIn = async (): Promise<LogInProps[]> => {
  try {
    const { data } = await instance.post(`/member/login`);
    return data;
  } catch (error) {
    console.error('LogIn Error:', error);
    throw new Error('로그인 오류');
  }
};

export const EmailDuplicateCheck = async (Email: string): Promise<boolean> => {
  try {
    const { data } = await instance.get('./member/check-email-duplicate', Email);
    return data;
  } catch (error) {
    console.error('Email DuplicateCheck Error', error);
    throw new Error('이메일 중복 체크 오류');
  }
};

export const GetTemporaryPassword = async (Email: string): Promise<string> => {
  try {
    const { data } = await instance.post('./member/issue-temp-password', Email);
    return data;
  } catch (error) {
    console.error('TemporaryPassword Error', error);
    throw new Error('임시 비밀번호 발급 오류');
  }
};

export const SendAuthNumber = async (Email: string): Promise<string> => {
  try {
    const { data } = await instance.post('./mail/send-verification', Email);
    return data;
  } catch (error) {
    console.error('SendAuthenticationNumber Error', error);
    throw new Error('인증번호 전송 오류');
  }
};

export const CheckAuthNumber = async (Email: string, number: string): Promise<string> => {
  try {
    const { data } = await instance.post('./mail/verify', { email, number });
    return data;
  } catch (error) {
    console.error('CheckSendAuthenticationNumber Error', error);
    throw new Error('인증번호 확인 오류');
  }
};

export const NaverSignUp = async () => {
  try {
    const { data } = await instance.post('oauth2/authorization/naver');
    return data;
  } catch (error) {
    console.error('NaverSignUp Error', error);
    throw new Error('네이버 회원가입 오류');
  }
};

export const GoogleSignUp = async () => {
  try {
    const { data } = await instance.post('oauth2/authorization/google');
    return data;
  } catch (error) {
    console.error('GoogleSignUp Error', error);
    throw new Error('구글 회원가입 오류');
  }
};
