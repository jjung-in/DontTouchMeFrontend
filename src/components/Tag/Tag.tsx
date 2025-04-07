import * as S from './Tag.styles';

interface Props {
  label: string;
}

const Tag = ({ label }: Props) => {
  return <S.TagContainer>{label}</S.TagContainer>;
};

export default Tag;
