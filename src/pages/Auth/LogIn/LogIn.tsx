import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogInProps } from "@_types/auth.type";

const LogIn = () => {
    const [FormData, setFormData] = useState <LogInProps>({
      Email : "",
      Password : ""
    });

    const navigate = useNavigate();

    const HandleLogIn = (e : React.FormEvent) => {
      e.preventDefault();
      
      if (!FormData.Email || !FormData.Password ) {
        console.log("모든 칸을 채워주세요.");
      } else {
        console.log("로그인 성공!");
        navigate("../");
      }
    };

    const HandleSignUp = () => {
    }
    
    return (
      <div>
        <form onSubmit={HandleLogIn}>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={FormData.Email}
            onChange={(e) => setFormData({...FormData, Email: e.target.value })}
          />

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={FormData.Password}
            onChange={(e) => setFormData({...FormData, Password: e.target.value })}
          />

          <button type="submit">로그인</button>
          <button onClick={HandleSignUp}>회원가입</button>
        </form>
      </div>
    );
  };
  
  export default LogIn;