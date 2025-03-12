import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInProps } from '@_types/auth.type';
import { useLogIn } from '@_hooks/useAuth';

const LogIn = () => {
  const [FormData, setFormData] = useState<LogInProps>({
    Email: '',
    Password: '',
  });
  const navigate = useNavigate();
  const LogIn = useLogIn(FormData);

  const HandleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!FormData.Email || !FormData.Password) {
      console.log('모든 칸을 채워주세요.');
      return;
    }

    try {
      await LogIn();
      navigate('../');
    } catch (errer) {
      console.error('로그인 중 오류 발생:', errer);
    }
  };

  const HandleSignUp = () => {
    navigate('../SignUp/SignUp');
  };

  return (
    <div>
      <form onSubmit={HandleLogIn}>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={FormData.Email}
          onChange={(e) => setFormData({ ...FormData, Email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={FormData.Password}
          onChange={(e) => setFormData({ ...FormData, Password: e.target.value })}
          required
        />

        <button type="submit">로그인</button>
        <button type="button" onClick={HandleSignUp}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default LogIn;
