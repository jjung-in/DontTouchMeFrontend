import * as S from './HighlightSection.styles';
import avatar from '@_assets/images/boy.png';
import naver from '@_assets/images/naver.png';
import google from '@_assets/images/google.png';
import FadeInUp from '@_components/Animation/FadeInUp/FadeInUp';
import Floating from '@_components/Animation/Floating/Floating';

const HighlightSection = () => {
  return (
    <S.Section>
      <S.Abatar>
        <img src={avatar} alt="페이블 캐릭터" />
        <S.BadgeTop>
          <Floating>
            <S.Badge>
              <span>500000+</span>
              <br />
              누적 다운로드 수
            </S.Badge>
          </Floating>
        </S.BadgeTop>
        <S.BadgeBottom>
          <Floating>
            <S.Badge>
              <span>300000+</span>
              <br />
              누적 이용자 수
            </S.Badge>
          </Floating>
        </S.BadgeBottom>
      </S.Abatar>
      <S.Info>
        <FadeInUp>
          <S.Title>
            이보다 쉬울 수 없다!
            <br />
            페이블과 함께 <S.HighlightText>스마트</S.HighlightText>한 비용 관리
          </S.Title>
        </FadeInUp>
        <S.SignUpBlock>
          <S.SocialButtonGroup>
            <S.SocialButton>
              <img src={naver} />
            </S.SocialButton>
            <S.SocialButton>
              <img src={google} />
            </S.SocialButton>
          </S.SocialButtonGroup>
          <S.SignUpText>간편 회원가입 하러가기</S.SignUpText>
        </S.SignUpBlock>
      </S.Info>
    </S.Section>
  );
};

export default HighlightSection;
