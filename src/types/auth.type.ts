export interface SignUpProps {
  name: string;
  email: string;
  password: string;
  contact: string;
  verificationCode : string;
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

export interface EmailVerifyResponse{
  email : string;
  verificationCode : string;
}

