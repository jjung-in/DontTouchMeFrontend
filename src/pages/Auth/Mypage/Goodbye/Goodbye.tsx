import home from '@_assets/icons/home.png';
import goodbye from '@_assets/images/goodbye.png';
import * as S from './Goodbye.styles';

const Goodbye = () => {
  return (
    <S.Main>
      <S.Image src={goodbye} />
      <S.Title>회원 탈퇴 완료</S.Title>
      <S.SubTitle>
        회원 탈퇴가 정상적으로 처리되었습니다.
        <br />
        그동안 이용해주셔서 감사합니다.
        <br />
        언제든 다시 가입하실 수 있으니, 필요하실 때 편하게 이용해주세요.
      </S.SubTitle>
      <S.HomeButton to="/">
        홈으로
        <img src={home} />
      </S.HomeButton>
    </S.Main>
  );
};

export default Goodbye;
