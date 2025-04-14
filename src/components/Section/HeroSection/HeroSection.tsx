import * as S from './HeroSection.styles';
import FadeInUp from '@_components/Animation/FadeInUp/FadeInUp';
import Floating from '@_components/Animation/Floating/Floating';
import calculator from '@_assets/images/calculator.png';
import document from '@_assets/images/document.png';
import calendar from '@_assets/images/calendar.png';

const HeroSection = () => {
  return (
    <S.Section>
      <FadeInUp>
        <S.Title>
          번거로운 비용정산?
          <br />
          <span>한 번의 클릭</span>으로 끝!
        </S.Title>
      </FadeInUp>
      <S.FloatingGroup>
        <Floating>
          <S.FloatingImage src={calculator} alt="계산기" $top="0px" $left="0px" />
        </Floating>
        <Floating>
          <S.FloatingImage src={calendar} alt="달력" $top="25px" $left="210px" $width="220px" $height="220px" />
        </Floating>
        <Floating>
          <S.FloatingImage src={document} alt="문서" $top="185px" $left="89px" />
        </Floating>
      </S.FloatingGroup>
    </S.Section>
  );
};

export default HeroSection;
