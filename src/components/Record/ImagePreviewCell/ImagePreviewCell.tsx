import { useState } from 'react';
import * as S from './ImagePreviewCell.styles';

interface Props {
  imageUrl: string;
}
const ImagePreviewCell = ({ imageUrl }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <S.Container>
      {imageUrl && (
        <>
          <S.Text
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setModalOpen(true)}
          >
            이미지 보기
          </S.Text>
          {isHovered && <S.PreviewImage src={imageUrl} alt="이미지 미리보기" />}
          {modalOpen && (
            <S.Overlay onClick={() => setModalOpen(false)}>
              <img src={imageUrl} alt="첨부 이미지" onClick={(e) => e.stopPropagation()} />
            </S.Overlay>
          )}
        </>
      )}
    </S.Container>
  );
};

export default ImagePreviewCell;
