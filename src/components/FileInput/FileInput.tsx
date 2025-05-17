import { useId, useState } from 'react';
import * as S from './FileInput.styles';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ onChange }: Props) => {
  const id = useId();
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    onChange(e);
  };

  return (
    <>
      <S.Label htmlFor={`file-${id}`}>
        <span>{fileName}</span>
      </S.Label>
      <input type="file" id={`file-${id}`} accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
    </>
  );
};

export default FileInput;
