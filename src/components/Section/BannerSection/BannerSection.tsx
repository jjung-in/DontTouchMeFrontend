import * as S from './BannerSection.styles';
import FadeInUp from '@_components/Animation/FadeInUp/FadeInUp';
import RotateY from '@_components/Animation/RotateY/RotateY';
import browser from '@_assets/images/browser.png';

const BannerSection = () => {
  return (
    <S.Section>
      <FadeInUp>
        <S.Title>
          어디서나&nbsp;
          <S.HighlightText>간편</S.HighlightText>
          하게&nbsp;
          <S.HighlightText>페이블</S.HighlightText>
        </S.Title>
      </FadeInUp>
      <RotateY>
        <S.Image src={browser} alt="브라우저" />
      </RotateY>
    </S.Section>
  );
};

export default BannerSection;
