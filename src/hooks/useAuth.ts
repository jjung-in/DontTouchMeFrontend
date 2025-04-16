import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PostSignUp, EmailDuplicateCheck, SendAuthNumber, CheckAuthNumber, PostLogIn } from '@_api/auth';
import { SignUpProps, EmailVerifyRequest, LogInFormValues } from '@_types/auth.type';
import { useAuthStore } from '@_store/authStore';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const useLogInFlow = () => {
  const [formValues, setFormValues] = useState<LogInFormValues>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const logInMutation = useMutation({
    mutationFn: PostLogIn,
    onSuccess: ({ accessToken, memberId }) => {
      setAuth(accessToken, Number(memberId));
      navigate('/');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message ?? '로그인 중 오류가 발생했습니다.';
      console.error('로그인 실패:', message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formValues;

    if (!email || !password) {
      console.log('모든 필드를 입력해주세요.');
      return;
    }

    logInMutation.mutate(formValues);
  };

  return {
    formValues,
    handleChange,
    handleLogIn,
    isPending: logInMutation.isPending,
    isError: logInMutation.isError,
    error: logInMutation.error,
  };
};

export const useSignUpFlow = () => {
  const [FormData, setFormData] = useState<SignUpProps>({
    name: '',
    email: '',
    password: '',
    contact: '',
    confirmPassword: '',
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

  useEffect(() => {
    setEmailNumber((prevState) => ({
      ...prevState,
      email: FormData.email,
    }));
  }, [FormData.email]);

  // 인증번호 확인
  const authNumberMutation = useMutation({
    mutationFn: CheckAuthNumber,
    onSuccess: (result) => {
      if (result.message == '인증이 완료 되었습니다.') {
        console.log('인증번호가 일치합니다.');
      }
    },
    onError: (error) => {
      console.log('인증번호 확인 success', result);
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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(FormData.password)) {
      console.log('비밀번호는 대소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
      return;
    }

    if (FormData.password !== FormData.confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!EmailNumber.verificationCode) {
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
