import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { SignUpProps } from '@_types/auth.type';
import { useSignUp, useEmailDuplicateCheck } from '@_hooks/useAuth';

const SignUp = () => {
  const [FormData, setFormData] = useState<SignUpProps>({
    name: '',
    email: '',
    password: '',
    contact: '',
    verificationCode: '',
  });

  const [mailActivate, setmailActivate] = useState(false);

  const { mutate: signUp } = useSignUp();
  const { data: isEmailAvailable } = useEmailDuplicateCheck(FormData.email);

  const HandleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!FormData.email || !FormData.password || !FormData.contact || !FormData.name) {
      console.log('모든 필드를 채워주세요.');
      return;
    }
    if (FormData.password !== FormData.confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }
    signUp(
      {
        name: FormData.name,
        email: FormData.email,
        password: FormData.password,
        contact: FormData.contact,
      },
      {
        onSuccess: () => {
          console.log('회원가입 성공');
          // navigate('/');
        },
      },
    );
  };

  useEffect(() => {
    const HyphenPhoneNumber = FormData.contact;

    if (HyphenPhoneNumber.length === 4) {
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

  const emailChack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!FormData.email) {
      console.log('이메일을 입력해주세요.');
      return;
    } else {
      if (isEmailAvailable) {
        console.log('이메일이 중복되지 않습니다.');
        setmailActivate(true);
      } else {
        console.log('이미 존재하는 이메일입니다.', mailActivate);
      }
    }
  };

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
          <button onClick={emailChack}>인증</button>
        </span>

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
        />

        <input
          type="tel"
          placeholder="전화번호를 입력하세요"
          value={FormData.contact}
          onChange={(e) => setFormData({ ...FormData, contact: e.target.value })}
        />

        <button onClick={HandleSignUp}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
