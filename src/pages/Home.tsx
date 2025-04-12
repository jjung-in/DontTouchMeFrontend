import BannerSection from '@_components/Section/BannerSection/BannerSection';
import HeroSection from '@_components/Section/HeroSection/HeroSection';
// import HighlightSection from '@_components/Section/HighlightSection/HighlightSection';
import StepSection from '@_components/Section/StepSection/StepSection';

const Home = () => {
  return (
    <main style={{ padding: 0 }}>
      <HeroSection />
      {/* <HighlightSection /> */}
      <BannerSection />
      <StepSection />
    </main>
  );
};

export default Home;
