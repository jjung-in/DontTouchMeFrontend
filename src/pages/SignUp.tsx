import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpProps } from "@_types/auth.type";

const SignUp = () => {
  const [FormData, setFormData] = useState <SignUpProps>({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
  });
  
  const navigate = useNavigate();

  const HandleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!FormData.Email || !FormData.Password || !FormData.ConfirmPassword || !FormData.PhoneNumber) {
    console.log("모든 필드을 채워주세요.");
    } else if (FormData.Password !== FormData.ConfirmPassword) {
      console.log("비밀번호가 일치하지 않습니다.");
    } else {
      // TODO: SignUp API 요청
      console.log("회원가입 성공!");
    };
  };

  useEffect(() => {
    const HyphenPhoneNumber = FormData.PhoneNumber;
  
    if (HyphenPhoneNumber.length === 10) {
      setFormData(prevData => ({
        ...prevData,
        PhoneNumber: HyphenPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      }));
    } else if (HyphenPhoneNumber.length === 13) {
      setFormData(prevData => ({
        ...prevData,
        PhoneNumber: HyphenPhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      }));
    };
  }, [FormData.PhoneNumber]);

  const HandleHome = () => {
    navigate("../");
    // console.log(FormData.PhoneNumber)
  };
  
  return (
    <div>
      <form onSubmit={HandleSignUp}>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={FormData.Email}
          onChange={(e) => setFormData({...FormData, Email: e.target.value })}
        />

        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={FormData.Password}
          onChange={(e) => setFormData({...FormData, Password: e.target.value })}
        />

        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={FormData.ConfirmPassword}
          onChange={(e) => setFormData({...FormData, ConfirmPassword: e.target.value })}
        />

        <input
          type="tel"
          placeholder="전화번호를 입력하세요"
          value={FormData.PhoneNumber}
          maxLength={13}
          pattern="010-[0-9]{4}-[0-9]{4}"
          onChange={(e) => setFormData({...FormData, PhoneNumber: e.target.value })}
          />

          <button onClick={HandleHome}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;