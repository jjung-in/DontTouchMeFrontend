import axios from 'axios';
import { instance } from './instance';

export const uploadImage = async (file: File) => {
  const { data } = await instance.get('/image/upload', { params: { fileName: file.name } });
  const { presignedUrl, fileUrl } = data;

  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
  });

  return fileUrl;
};
