export interface SignUpProps {
  name: string;
  email: string;
  password: string;
  contact: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  id: number;
  name: string;
  email: string;
}

export interface LogInFormValues {
  email: string;
  password: string;
}

export interface LogInRequest {
  email: string;
  password: string;
}

export interface LogInResponse {
  accessToken: string;
  memberId: number;
  message: string;
}

export interface EmailVerifyRequest {
  email: string;
  verificationCode: string;
}

export interface EmailVerifyResponse {
  email: string;
  message: string;
}

export interface SendEmailVerifyResponse {
  email: 'string';
  state: 'string';
}

export interface TokenReissueResponse {
  accessToken: string;
  memberId: number;
}
