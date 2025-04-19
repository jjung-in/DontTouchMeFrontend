import {
  LogInRequest,
  LogInResponse,
  TokenReissueResponse,
  TSignUpRequest,
  TSignUpResponse,
  TEmailDuplicateCheckResponse,
  TSendEmailCodeResponse,
  TVerifyEmailCodeRequest,
  TVerifyEmailCodeResponse,
} from '@_types/auth.type';
import { instance } from './instance';
import { parseAccessToken } from '@_utils/auth';
import { AxiosError } from 'axios';

export const postSignUp = async (signUpData: TSignUpRequest): Promise<TSignUpResponse> => {
  const { data } = await instance.post(`/member/sign-up`, signUpData);
  return data;
};

export const checkEmailDuplicate = async (email: string): Promise<TEmailDuplicateCheckResponse> => {
  const { data } = await instance.get('/member/check-email-duplicate', {
    params: { email: email },
  });
  return data;
};

export const sendEmailCode = async (email: string): Promise<TSendEmailCodeResponse> => {
  const { data } = await instance.post('/mail/send-verification', {
    email: email,
  });
  return data;
};

export const verifyEmailCode = async (verifyData: TVerifyEmailCodeRequest): Promise<TVerifyEmailCodeResponse> => {
  const { data } = await instance.post('/mail/verify', verifyData);
  return data;
};

export const PostLogIn = async (loginData: LogInRequest): Promise<LogInResponse> => {
  try {
    const response = await instance.post(`/member/login`, loginData);

    const rawToken = response.headers['authorization'];
    const accessToken = rawToken?.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;

    const parsed = accessToken ? parseAccessToken(accessToken) : null;
    const memberId = parsed?.id;

    if (!accessToken || !memberId) {
      throw new Error('accessToken 또는 memberId가 유효하지 않습니다.');
    }

    return { accessToken, memberId, message: response.data.message };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const serverMessage = error.response?.data?.message || '로그인에 실패했습니다.';
    throw new Error(serverMessage);
  }
};

export const ReissueAccessToken = async (): Promise<TokenReissueResponse> => {
  try {
    const response = await instance.post('/jwt/reissue', null);

    const rawToken = response.headers['authorization'];
    const accessToken = rawToken?.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;

    const parsed = accessToken ? parseAccessToken(accessToken) : null;
    const memberId = parsed?.id;

    if (!accessToken || !memberId) {
      throw new Error('accessToken 재발급 실패');
    }

    return { accessToken, memberId };
  } catch (error) {
    console.error('Token Reissue Error:', error);
    throw new Error('accessToken 재발급 오류');
  }
};

export const CookieToHeader = async (): Promise<string> => {
  try {
    const response = await instance.get('/jwt');

    const rawToken = response.headers['authorization'];
    const accessToken = rawToken?.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;

    if (!accessToken) {
      throw new Error('헤더로 토큰 이동 실패');
    }

    return accessToken;
  } catch (error) {
    console.error('CookieToHeader Error:', error);
    throw new Error('쿠키 → 헤더 이동 실패');
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
