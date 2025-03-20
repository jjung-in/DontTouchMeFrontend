import { TagContainer } from './Tag.styles';

interface Props {
  label: string;
}

const Tag = ({ label }: Props) => {
  return <TagContainer>{label}</TagContainer>;
};

export default Tag;
