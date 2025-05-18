export interface TSignUpFormValues {
  name: string;
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
  contact: string;
}

export type TSignUpFormErrors = Partial<Record<keyof TSignUpFormValues, string>>;

export interface TSignUpRequest {
  name: string;
  email: string;
  password: string;
  contact: string;
}

export interface TSignUpResponse {
  id: number;
  name: string;
  email: string;
}

export interface TEmailDuplicateCheckResponse {
  isDuplicated: boolean;
}

export interface TSendEmailCodeResponse {
  email: 'string';
  state: 'string';
}

export interface TVerifyEmailCodeRequest {
  email: string;
  verificationCode: string;
}

export interface TVerifyEmailCodeResponse {
  email: string;
  message: string;
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

export interface TokenReissueResponse {
  accessToken: string;
  memberId: number;
}

export interface TCheckPasswordRequest {
  currentPassword: string;
}

export interface TProfileEditRequest {
  name: string;
  newPassword: string;
  contact: string;
}

export interface TProfileEditFormValue {
  name: string;
  newPassword: string;
  confirmPassword: string;
  contact: string;
}

export interface TProfileEditResponse {
  id: number;
  name: string;
  email: string;
  contact: string;
}