import { useLogInFlow } from '@_hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const { FormData, setFormData, handleLogIn } = useLogInFlow();
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={handleLogIn}>
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
        <button type="button" onClick={() => navigate('../signup')}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default LogIn;