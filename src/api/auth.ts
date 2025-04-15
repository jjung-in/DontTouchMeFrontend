import {
  LogInProps,
  LogInResponse,
  SignUpProps,
  SignUpResponse,
  EmailVerifyResponse,
  SendEmailVerifyResponse,
} from '@_types/auth.type';
import { instance } from '@_api/interface';

export const PostSignUp = async (signUpData: SignUpProps): Promise<SignUpResponse> => {
  try {
    const { data } = await instance.post(`/member/sign-up`, signUpData);
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 400) {
        console.log('이미 가입된 계정입니다');
      }
    } else {
      console.error('SignUp Error', error);
      throw new Error('회원가입 오류');
    }
  }
};

export const PostLogIn = async (loginData: LogInProps): Promise<LogInResponse> => {
  try {
    const response = await instance.post(`/member/login`, loginData, {
      withCredentials: true,
    });

    const rawToken = response.headers['authorization'];
    const accessToken = rawToken?.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;

    if (!accessToken) {
      throw new Error('헤더에서 accessToken을 찾을 수 없습니다.');
    }

    return accessToken;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('인증실패');
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }

    console.error('LogIn Error:', error);
    throw new Error('로그인 오류');
  }
};

export const EmailDuplicateCheck = async (email: string): Promise<boolean> => {
  try {
    const { data } = await instance.get('./member/check-email-duplicate', {
      params: { email: email },
    });
    return data;
  } catch (error) {
    console.error('Email DuplicateCheck Error', error);
    throw new Error('이메일 중복 체크 오류');
  }
};

export const GetTemporaryPassword = async (email: string): Promise<string> => {
  try {
    const { data } = await instance.post('./member/issue-temp-password', email);
    return data;
  } catch (error) {
    console.error('TemporaryPassword Error', error);
    throw new Error('임시 비밀번호 발급 오류');
  }
};

export const SendAuthNumber = async (email: string): Promise<SendEmailVerifyResponse> => {
  try {
    const { data } = await instance.post('./mail/send-verification', {
      email: email,
    });
    return data;
  } catch (error) {
    console.error('SendAuthenticationNumber Error', error);
    throw new Error('인증번호 발급 오류');
  }
};

export const CheckAuthNumber = async (verify: string): Promise<EmailVerifyResponse> => {
  try {
    const { data } = await instance.post('./mail/verify', {
      email: verify.email,
      verificationCode: verify.verificationCode,
    });
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        console.log('인증번호가 일치하지 않습니다.');
      }
    } else {
      console.error('에러 응답:', error?.response?.data || error.message);
      throw new Error('인증번호 확인 오류');
    }
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
