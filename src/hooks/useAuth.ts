import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PostSignUp, EmailDuplicateCheck, SendAuthNumber, CheckAuthNumber, PostLogIn } from '@_api/auth';
import { SignUpProps, EmailVerifyRequest, LogInProps } from '@_types/auth.type';
// import { useNavigate } from 'react-router-dom';

export const useLogInFlow = () => {
  const [FormData, setFormData] = useState<LogInProps>({
    Email: '',
    Password: '',
  });

  // const navigate = useNavigate();

  const logInMutation = useMutation({
    mutationFn: PostLogIn,
    onSuccess: (accessToken) => {
      console.log(accessToken);
      if (!accessToken) {
        console.error('토큰 없음');
        throw new Error('accessToken 없음');
      }      
      console.log('로그인 성공');
      localStorage.setItem('accessToken', accessToken);
      // navigate('/');
    },    
    onError: (error) => {
      console.error('로그인 실패', error);
    },
  });

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!FormData.Email || !FormData.Password) {
      console.log('모든 칸을 채워주세요.');
      return;
    }

    logInMutation.mutate(FormData);
  };

  return {
    FormData,
    setFormData,
    logInMutation,
    handleLogIn,
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