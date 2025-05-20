import {
  PostLogIn,
  checkEmailDuplicate,
  checkPassword,
  postSignUp,
  profileEdit,
  sendEmailCode,
  verifyEmailCode,
  withdrawMember,
} from '@_api/auth';
import { useAuthStore } from '@_store/authStore';
import { useToastStore } from '@_store/toastStore';
import {
  LogInFormValues,
  TCheckPasswordRequest,
  TProfileEditFormErrors,
  TProfileEditFormValues,
  TSignUpFormErrors,
  TSignUpFormValues,
} from '@_types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
      useToastStore.getState().showToast('로그인되었습니다.');
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message ?? '로그인 중 오류가 발생했습니다.';
      console.error('로그인 실패:', message);
      useToastStore.getState().showToast('로그인에 실패했습니다.', 'error');
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

  const handleTestLogIn = () => {
    const testCredentials = {
      email: import.meta.env.VITE_TEST_EMAIL,
      password: import.meta.env.VITE_TEST_PASSWORD,
    };
    logInMutation.mutate(testCredentials);
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
    handleTestLogIn,
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
    else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
        formValues.password,
      )
    )
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

export const useCheckPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') ?? 'edit';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkPasswordMutation = useMutation<void, Error, TCheckPasswordRequest>({
    mutationFn: checkPassword,
    onSuccess: () => {
      useAuthStore.getState().setIsCheckedPassword(true);
      if (type === 'edit') {
        navigate('/mypage/edit');
      } else if (type === 'unregister') {
        setIsModalOpen(true);
      }
      setError('');
    },
    onError: () => {
      setError('비밀번호가 일치하지 않습니다.');
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: withdrawMember,
    onSuccess: () => {
      useAuthStore.getState().logout();
      navigate('/goodbye');
    },
    onError: () => {
      setIsModalOpen(false);
      useToastStore.getState().showToast('회원 탈퇴에 실패했습니다.', 'error');
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    checkPasswordMutation.mutate({ currentPassword: password });
  };

  const handleWithdraw = () => {
    withdrawMutation.mutate();
  };

  return {
    password,
    error,
    isModalOpen,
    setIsModalOpen,
    handlePasswordChange,
    handleSubmit,
    handleWithdraw,
    isPasswordChecking: checkPasswordMutation.isPending,
    isWithdrawLoading: withdrawMutation.isPending,
  };
};

export const useProfileEdit = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<TProfileEditFormValues>({
    name: '',
    newPassword: '',
    contact: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<TProfileEditFormErrors>({});

  const validateProfileForm = () => {
    const errors: TProfileEditFormErrors = {};

    if (!formValues.name.trim()) errors.name = '이름을 입력해주세요.';
    if (!formValues.newPassword.trim()) errors.newPassword = '비밀번호를 입력해주세요.';
    else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
        formValues.newPassword,
      )
    )
      errors.newPassword = '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.';
    if (!formValues.confirmPassword.trim()) errors.confirmPassword = '비밀번호를 다시 입력해주세요.';
    else if (formValues.newPassword !== formValues.confirmPassword)
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    if (!formValues.contact.trim()) errors.contact = '연락처를 입력해주세요.';

    return errors;
  };

  const profileEditMutation = useMutation({
    mutationFn: profileEdit,
    onSuccess: () => {
      useToastStore.getState().showToast('회원정보가 수정되었습니다.');
      navigate('/mypage');
    },
    onError: () => {
      useToastStore.getState().showToast('회원정보 수정에 실패했습니다.', 'error');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof TProfileEditFormValues;

    setFormErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateProfileForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    profileEditMutation.mutate({
      name: formValues.name,
      newPassword: formValues.newPassword,
      contact: formValues.contact,
    });
  };

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    isPending: profileEditMutation.isPending,
    isError: profileEditMutation.isError,
    error: profileEditMutation.error,
  };
};
