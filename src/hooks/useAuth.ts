import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postSignUp, PostLogIn, checkEmailDuplicate, sendEmailCode, verifyEmailCode } from '@_api/auth';
import { LogInFormValues, TSignUpFormValues, TSignUpFormErrors } from '@_types/auth.type';
import { useAuthStore } from '@_store/authStore';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const useLogInFlow = () => {
  const [formValues, setFormValues] = useState<LogInFormValues>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<LogInFormValues>>({});

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
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formValues;
    const errors: Partial<LogInFormValues> = {};

    if (!email.trim()) errors.email = '이메일을 입력해주세요.';
    if (!password.trim()) errors.password = '비밀번호를 입력해주세요.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    logInMutation.mutate(formValues);
  };

  const handleGoogleClick = () => {
    window.location.href = `http://13.209.40.51:8080/oauth2/authorization/google`;
  };

  const handleNaverClick = () => {
    window.location.href = 'http://13.209.40.51:8080/oauth2/authorization/naver';
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleLogIn,
    handleNaverClick,
    handleGoogleClick,
    isPending: logInMutation.isPending,
    isError: logInMutation.isError,
    error: logInMutation.error,
  };
};

export const useSignUpFlow = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<TSignUpFormValues>({
    name: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
    contact: '',
  });
  const [formErrors, setFormErrors] = useState<TSignUpFormErrors>({});
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    marketing: false,
    email: false,
    sms: false,
  });

  const validateSignUpForm = () => {
    const errors: TSignUpFormErrors = {};

    if (!formValues.name.trim()) errors.name = '이름을 입력해주세요.';
    if (!formValues.email.trim()) errors.email = '이메일을 입력해주세요.';
    if (!formValues.verificationCode.trim()) errors.verificationCode = '인증번호를 입력해주세요.';
    if (!formValues.password.trim()) errors.password = '비밀번호를 입력해주세요.';
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formValues.password))
      errors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.';
    if (!formValues.confirmPassword.trim()) errors.confirmPassword = '비밀번호를 다시 입력해주세요.';
    else if (formValues.password !== formValues.confirmPassword)
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    if (!formValues.contact.trim()) errors.contact = '연락처를 입력해주세요.';

    return errors;
  };

  const requestEmailCodeMutation = useMutation({
    mutationFn: checkEmailDuplicate,
    onSuccess: (result) => {
      if (result.isDuplicated) {
        setFormErrors((prev) => ({
          ...prev,
          email: '이미 존재하는 이메일입니다.',
        }));
      } else {
        sendEmailCodeMutation.mutate(formValues.email);
      }
    },
    onError: (error) => {
      console.error('이메일 중복 확인 요청 실패', error);
    },
  });

  const sendEmailCodeMutation = useMutation({
    mutationFn: sendEmailCode,
    onSuccess: () => {
      setIsVerificationRequested(true);
      setVerificationMessage('인증번호를 이메일로 전송했습니다.');
    },
    onError: () => {
      setIsVerificationRequested(false);
      setFormErrors((prev) => ({
        ...prev,
        verificationCode: '인증번호 전송에 실패했습니다. 다시 시도해주세요.',
      }));
    },
  });

  const verifyEmailCodeMutation = useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: (result) => {
      setVerificationMessage(result.message);
      setIsVerificationSuccess(true);
    },
    onError: () => {
      setFormErrors((prev) => ({
        ...prev,
        verificationCode: '인증번호 확인에 실패했습니다.',
      }));
      setIsVerificationSuccess(false);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: (result) => {
      console.log('회원가입 성공', result);
      navigate('/auth/success');
    },
    onError: (error) => {
      console.error('회원가입 오류', error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof TSignUpFormValues;

    setFormErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });

    if (name === 'email') {
      setFormValues((prev) => ({ ...prev, verificationCode: '' }));
      setIsVerificationRequested(false);
      setIsVerificationSuccess(false);
      setVerificationMessage('');
    }

    if (name === 'contact') {
      const numeric = value.replace(/[^0-9]/g, '').slice(0, 11);

      let formatted = numeric;
      if (numeric.length > 3 && numeric.length <= 7) {
        formatted = `${numeric.slice(0, 3)}-${numeric.slice(3)}`;
      } else if (numeric.length > 7) {
        formatted = `${numeric.slice(0, 3)}-${numeric.slice(3, 7)}-${numeric.slice(7, 11)}`;
      }

      setFormValues((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestEmailCode = () => {
    if (!formValues.email.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        email: '이메일을 입력해주세요.',
      }));
      return;
    }

    requestEmailCodeMutation.mutate(formValues.email);
  };

  const handleVerifyEmailCode = () => {
    if (!formValues.verificationCode.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        verificationCode: '인증번호를 입력해주세요.',
      }));
      return;
    }

    verifyEmailCodeMutation.mutate({ email: formValues.email, verificationCode: formValues.verificationCode });
  };

  const handleAgreementChange = (name: keyof typeof agreements, checked: boolean) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateSignUpForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!isVerificationRequested || !isVerificationSuccess) {
      setFormErrors((prev) => ({
        ...prev,
        verificationCode: '인증번호 확인이 필요합니다.',
      }));
      return;
    }

    if (!agreements.service || !agreements.privacy) {
      return;
    }

    signUpMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      contact: formValues.contact,
    });
  };

  return {
    formValues,
    formErrors,
    verificationMessage,
    isVerificationRequested,
    isVerificationSuccess,
    agreements,
    handleChange,
    handleRequestEmailCode,
    handleVerifyEmailCode,
    handleAgreementChange,
    handleSignUp,
    isPending: signUpMutation.isPending,
    isError: signUpMutation.isError,
    error: signUpMutation.error,
  };
};

export const useRequireAuth = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인 후 이용할 수 있습니다.');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn;
};
