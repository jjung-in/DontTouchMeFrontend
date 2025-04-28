import Button from '@_components/Common/Button/Button';
import * as S from './ThumbnailUploader.styles';
import noimage from '@_assets/images/noimage.png';

/**
 * ThumbnailUploader 컴포넌트 (썸네일 이미지 업로드 및 미리보기를 위한 컴포넌트)
 * @param thumbnailPreview - 미리보기로 보여줄 이미지 URL
 * @param onChange - 파일 input의 onChange 핸들러
 * @param onReset - 업로드된 썸네일을 초기화하는 핸들러
 * @param thumbnailUrl - true일 경우 이미지 업로드/취소 버튼을 숨김김
 */

interface Props {
  thumbnailPreview: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  isReadonly?: boolean;
}

const ThumbnailUploader = ({ thumbnailPreview, onChange, onReset, isReadonly }: Props) => {
  return (
    <S.Wrapper>
      <S.ThumbnailBox>
        {thumbnailPreview ? <S.Thumbnail src={thumbnailPreview} /> : <img src={noimage} />}
      </S.ThumbnailBox>
      {!isReadonly &&
        (thumbnailPreview ? (
          <Button onClick={onReset} variant="primary">
            취소
          </Button>
        ) : (
          <label htmlFor="thumbnail">
            <Button as="p">사진 등록하기</Button>
          </label>
        ))}
      <input type="file" id="thumbnail" accept="image/*" onChange={onChange} style={{ display: 'none' }} />
    </S.Wrapper>
  );
};

export default ThumbnailUploader;
