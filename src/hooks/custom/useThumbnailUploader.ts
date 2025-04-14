import { useEffect, useState } from 'react';
import { isImageFile } from '@_utils/image';

/**
 * 썸네일 이미지 업로드와 미리보기를 관리하는 Hook
 * @param initialUrl - 초기 썸네일 이미지 URL
 * @returns
 *  - thumbnailFile: 업로드된 이미지 파일 객체
 *  - thumbnailPreview: 이미지 미리보기용 URL
 *  - handleThumbnailChange: 파일 input의 onChange 핸들러
 *  - handleThumbnailReset: 썸네일 초기화 함수
 */

export const useThumbnailUploader = (initialUrl = '') => {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(initialUrl);

  useEffect(() => {
    if (initialUrl) {
      setThumbnailPreview(initialUrl);
    }
  }, [initialUrl]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isImageFile(file)) {
      alert('이미지 형식의 파일만 업로드할 수 있습니다.');
      e.target.value = '';
      return;
    }

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleThumbnailReset = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  return {
    thumbnailFile,
    thumbnailPreview,
    handleThumbnailChange,
    handleThumbnailReset,
  };
};
