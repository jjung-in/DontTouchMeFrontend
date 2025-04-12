import { useEffect } from 'react';
import { useSignUpFlow } from '@_hooks/useAuth';

const SignUp = () => {
  const {
    FormData,
    setFormData,
    EmailNumber,
    setEmailNumber,
    emailMutation,
    authNumberMutation,
    handleSignUp,
  } = useSignUpFlow();

  const emailCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!FormData.email) {
      console.log('이메일을 입력해주세요.');
    } else {
      emailMutation.mutate(FormData.email);
    }
  };

  const handleVerifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!FormData.verificationCode) {
      console.log('인증번호를 입력해주세요.');
    } else {
      authNumberMutation.mutate(EmailNumber);
    }
  };

  useEffect(() => {
    const HyphenPhoneNumber = FormData.contact;

      setFormData((prevData) => ({
        ...prevData,
        contact: HyphenPhoneNumber.replace(/(\d{3})(\d{1})/, '$1-$2'),
      }));
    } else if (HyphenPhoneNumber.length === 9) {
      setFormData((prevData) => ({
        ...prevData,
        contact: HyphenPhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{1})/, '$1-$2-$3'),
      }));
    }
  }, [FormData.contact]);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={FormData.name}
          onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
        />

        <span>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={FormData.email}
            autoComplete="email"
            onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
          />
          <button onClick={emailCheck}>인증</button>
        </span>

        <input
          type="text"
          placeholder="인증번호를 입력하세요"
          value={EmailNumber.verificationCode}
          onChange={(e) => setEmailNumber({ ...EmailNumber, verificationCode: e.target.value })}
        />
        <button onClick={handleVerifyCode}>인증번호 확인</button>

        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={FormData.password}
          autoComplete="new-password"
          onChange={(e) => setFormData({ ...FormData, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          value={FormData.confirmPassword}
          onChange={(e) => setFormData({ ...FormData, confirmPassword: e.target.value })}
        />

        <input
          type="tel"
          placeholder="전화번호를 입력하세요"
          value={FormData.contact}
          onChange={(e) => setFormData({ ...FormData, contact: e.target.value })}
        />

        <button onClick={handleSignUp}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;