import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PostSignUp, EmailDuplicateCheck, SendAuthNumber, CheckAuthNumber } from '@_api/auth';
import { SignUpProps, EmailVerifyRequest } from '@_types/auth.type';

//로그인
export const useLogIn = () => {
  return useMutation({
    mutationFn: PostLogIn,
    onSuccess: (result) => {
      console.log('login success', result);
      // const { accessToken, refreshToken } = result;
      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);
    },
    onError: (error) => {
      console.error('LogIn Error', error);
    },
  });
};

export const useSignUpFlow = () => {
  const [FormData, setFormData] = useState<SignUpProps>({
    name: '',
    email: '',
    password: '',
    contact: '',
    verificationCode: '',
  });

  const [EmailNumber, setEmailNumber] = useState<EmailVerifyRequest>({
    email: FormData.email,
    verificationCode: '',
  });

  // 이메일 중복 확인
  const emailMutation = useMutation({
    mutationFn: EmailDuplicateCheck,
    onSuccess: (result) => {
      if (!result.isDuplicated) {
        sendAuthNumberMutation.mutate(FormData.email);
      } else {
        console.log('이미 존재하는 이메일입니다.');
      }
    },
    onError: (error) => {
      console.error('이메일 중복 확인 Error', error);
    },
  });

  // 인증번호 발급
  const sendAuthNumberMutation = useMutation({
    mutationFn: SendAuthNumber,
    onSuccess: (result) => {
      console.log('인증번호 발급 success', result);
    },
    onError: (error) => {
      console.error('인증번호 발급 Error', error);
    },
  });

  // 인증번호 확인
  const authNumberMutation = useMutation({
    mutationFn: CheckAuthNumber,
    onSuccess: (result) => {
      if (result.message === '인증번호가 일치합니다.') {
        console.log('인증번호가 일치합니다.');
      } else {
        console.log('인증번호가 일치하지 않습니다.', result);
      }
    },
    onError: (error) => {
      console.error('인증번호 확인 Error', error);
    },
  });

  // 회원가입 처리
  const signUpMutation = useMutation({
    mutationFn: PostSignUp,
    onSuccess: (result) => {
      console.log('회원가입 성공', result);
    },
    onError: (error) => {
      console.error('회원가입 오류', error);
    },
  });

  // 회원가입 핸들러
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!FormData.email || !FormData.password || !FormData.contact || !FormData.name) {
      console.log('모든 필드를 채워주세요.');
      return;
    }
    if (FormData.password !== FormData.confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!FormData.verificationCode) {
      console.log('인증번호를 입력해주세요.');
      return;
    }

    // 인증번호 확인 후 회원가입
    if (authNumberMutation.isSuccess) {
      signUpMutation.mutate({
        name: FormData.name,
        email: FormData.email,
        password: FormData.password,
        contact: FormData.contact,
      });
    } else {
      console.log('인증번호 확인이 필요합니다.');
    }
  };

  return {
    FormData,
    setFormData,
    EmailNumber,
    setEmailNumber,
    emailMutation,
    authNumberMutation,
    signUpMutation,
    handleSignUp,
  };
};