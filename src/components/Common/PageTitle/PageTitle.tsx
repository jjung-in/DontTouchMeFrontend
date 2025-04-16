import * as S from './PageTitle.styles';

/**
 * PageTitle 컴포넌트 (페이지 상단의 제목과 부제목을 보여주는 컴포넌트)
 * @param title - 제목
 * @param highlight - 제목에서 강조할 텍스트
 * @param subtitle - 부제목
 */

interface Props {
  title: string;
  highlight?: string;
  subtitle?: string;
}

const PageTitle = ({ title, highlight, subtitle }: Props) => {
  if (highlight) {
    const [before, after] = title.split(highlight);
    return (
      <>
        <S.Title>
          {before}
          <span>{highlight}</span>
          {after}
        </S.Title>
        {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
      </>
    );
  }

  return (
    <>
      <S.Title>{title}</S.Title>
      {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
    </>
  );
};

export default PageTitle;
