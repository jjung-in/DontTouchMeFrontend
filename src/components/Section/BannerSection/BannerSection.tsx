import * as S from './BannerSection.styles';
import FadeIn from '@_components/Animation/FadeInUp/FadeInUp';
import browser from '@_assets/images/browser.png';

const BannerSection = () => {
  return (
    <S.Section>
      <FadeIn>
        <S.TextBlock>
          어디서나&nbsp;
          <S.HighlightText>간편</S.HighlightText>
          하게&nbsp;
          <S.HighlightText>페이블</S.HighlightText>
        </S.TextBlock>
      </FadeIn>
      <S.Image src={browser} alt="브라우저" />
    </S.Section>
  );
};

export default BannerSection;
