import * as S from './BannerSection.styles';
import FadeInUp from '@_components/Animation/FadeInUp/FadeInUp';
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
      <S.Image src={browser} alt="브라우저" />
    </S.Section>
  );
};

export default BannerSection;
