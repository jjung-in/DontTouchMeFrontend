import { SignUpProps, LogInProps } from '@_types/auth.type';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  PostSignUp,
  PostLogIn,
  EmailDuplicateCheck,
  GetTemporaryPassword,
  SendAuthNumber,
  CheckAuthNumber,
} from '@_api/auth';

//로그인
export const useLogIn = (LogInData: LogInProps) => {
  const { data } = useQuery<LogInProps[]>({
    queryKey: ['logIn', LogInData],
    queryFn: () => PostLogIn(LogInData),
    enabled: !!LogInData.Email && !!LogInData.Password,
    onError: (error) => {
      console.error('LogIn Error', error);
    },
  });
  return { data };
};

//회원가입
export const useSignUp = (SignUpData: SignUpProps) => {
  const { data } = useMutation<SignUpProps[]>({
    mutationKey: ['signUp', SignUpData],
    mutationFn: () => PostSignUp(SignUpData),
    onSuccess: (data) => {
      console.log('SignUp Success', data);
    },
    onError: (error) => {
      console.error('SignUp Error', error);
    },
  });
  return { data };
};

//이메일 중복 확인
export const useEmailDuplicateCheck = (email: string) => {
  const { data } = useQuery<boolean>({
    queryKey: ['login', email],
    queryFn: () => EmailDuplicateCheck(email),
    enabled: !!Email,
    onError: (error) => {
      console.error('EmailDuplicate Error', error);
    },
  });
  if (data === true) {
    console.log('이메일이 중복되지 않습니다.');
  } else {
    console.log('이미 존재하는 이메일입니다.');
  }
  return { data };
};

//임시 비밀번호 발급
export const useGetTemporaryPassword = (email: string) => {
  const { data } = useQuery<string>({
    queryKey: ['password', email],
    queryFn: () => GetTemporaryPassword(email),
    onError: (error) => {
      console.error(error);
    },
  });
  return { data };
};

//이메일 인증번호 발급
export const useSendAuthNumber = (email: string) => {
  const { data } = useQuery<string[]>({
    queryKey: ['number', email],
    queryFn: () => SendAuthNumber(email),
    onError: (error) => {
      console.error(error);
    },
  });
  return { data };
};

//이메일 인증번호 확인
export const useCheckAuthNumber = (email: string, number: string) => {
  const { data } = useQuery<string[]>({
    queryKey: ['number', { email, number }],
    queryFn: () => CheckAuthNumber(email, number),
    onError: (error) => {
      console.error(error);
    },
  });
  return { data };
};

