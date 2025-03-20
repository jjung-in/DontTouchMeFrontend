import { instance } from './instance';

export const uploadImage = async (file: File) => {
  const { data } = await instance.get('/image/upload', { params: { fileName: file.name } });
  const { presignedUrl, fileUrl } = data;

  console.log(data);
  await instance.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
  });

  console.log('Uploaded file URL:', fileUrl);
  return fileUrl;
};
