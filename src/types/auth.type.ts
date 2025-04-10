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

export interface LogInProps {
  email: string;
  password: string;
}

export interface LogInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
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
