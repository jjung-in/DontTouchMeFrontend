import * as S from './CardComplete.styles';
import people from '@_assets/images/people.png';
import home from '@_assets/icons/home.png';

const CardComplete = () => {
  return (
    <S.Main>
      <img src={people} />
      <S.Title>감사장 전송 완료</S.Title>
      <S.SubTitle>총 n명의 대상에게 감사장 발송을 완료했습니다.</S.SubTitle>
      <S.HomeButton to="/events">
        홈으로
        <img src={home} />
      </S.HomeButton>
    </S.Main>
  );
};

export default CardComplete;
