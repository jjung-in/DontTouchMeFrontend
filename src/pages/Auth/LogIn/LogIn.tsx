import { useLogInFlow } from '@_hooks/useAuth';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const { formValues, handleChange, handleLogIn, isPending } = useLogInFlow();

  return (
    <main>
      <form onSubmit={handleLogIn}>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={formValues.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={formValues.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isPending}>
          로그인
        </button>

        <Link to="/signup">회원가입</Link>
      </form>
    </main>
  );
};

export default LogIn;
