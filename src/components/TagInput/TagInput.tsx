import useInput from '@_hooks/useInput';
import { Input, TagInputContainer } from './TagInput.styles';
import Tag from '@_components/Tag/Tag';
import { useRef, useState } from 'react';

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput = ({ tags, setTags }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { value, onChange, reset } = useInput<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      if (tags.length < 5 && !tags.includes(value.trim())) {
        setTags([...tags, value.trim()]);
      }
      reset();
    } else if (e.key === 'Backspace') {
      if (value === '') {
        setTags(tags.slice(0, -1));
      }
    }
  };

  return (
    <TagInputContainer onClick={handleContainerClick}>
      {tags.map((tag, index) => (
        <Tag label={tag} key={index} />
      ))}
      <Input
        type="text"
        placeholder="태그를 입력하세요"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
        maxLength={8}
        $isFocused={isFocused}
      />
    </TagInputContainer>
  );
};

export default TagInput;
