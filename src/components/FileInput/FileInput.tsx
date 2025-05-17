import { useEffect, useId, useState } from 'react';
import * as S from './FileInput.styles';

interface Props {
  imageUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ imageUrl, onChange }: Props) => {
  const id = useId();
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    setFileName(imageUrl);
  }, [imageUrl]);

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
