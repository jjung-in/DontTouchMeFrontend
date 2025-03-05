import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpProps } from '@_types/auth.type';
import { useSignUp } from '@_hooks/useAuth';

const SignUp = () => {
  const [FormData, setFormData] = useState<SignUpProps>({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    PhoneNumber: '',
  });

  const navigate = useNavigate();
  const { data, mutate: signUp } = useSignUp(FormData);

  const HandleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!FormData.Email || !FormData.Password || !FormData.ConfirmPassword || !FormData.PhoneNumber || !FormData.Name) {
      console.log('모든 필드를 채워주세요.');
      return;
    }
    if (FormData.Password !== FormData.ConfirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      signUp({
        Name: FormData.Name,
        Email: FormData.Email,
        Password: FormData.Password,
        PhoneNumber: FormData.PhoneNumber,
      });
    }
  };

  useEffect(() => {
    const HyphenPhoneNumber = FormData.PhoneNumber;

    if (HyphenPhoneNumber.length === 4) {
      setFormData((prevData) => ({
        ...prevData,
        PhoneNumber: HyphenPhoneNumber.replace(/(\d{3})(\d{1})/, '$1-$2'),
      }));
    } else if (HyphenPhoneNumber.length === 9) {
      setFormData((prevData) => ({
        ...prevData,
        PhoneNumber: HyphenPhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{1})/, '$1-$2-$3'),
      }));
    }
  }, [FormData.PhoneNumber]);

  useEffect(() => {
    if (data) {
      console.log('회원가입 성공!', data);
      navigate('../');
    }
  }, [data, navigate]);

  return (
    <div>
      <form onSubmit={HandleSignUp}>
        <input
          type="name"
          placeholder="이름을 입력하세요"
          value={FormData.Name}
          onChange={(e) => setFormData({ ...FormData, Name: e.target.value })}
        />

        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={FormData.Email}
          onChange={(e) => setFormData({ ...FormData, Email: e.target.value })}
        />

        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={FormData.Password}
          onChange={(e) => setFormData({ ...FormData, Password: e.target.value })}
        />

        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={FormData.ConfirmPassword}
          onChange={(e) => setFormData({ ...FormData, ConfirmPassword: e.target.value })}
        />

        <input
          type="tel"
          placeholder="전화번호를 입력하세요"
          value={FormData.PhoneNumber}
          maxLength={13}
          pattern="010-[0-9]{4}-[0-9]{4}"
          onChange={(e) => setFormData({ ...FormData, PhoneNumber: e.target.value })}
        />

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
