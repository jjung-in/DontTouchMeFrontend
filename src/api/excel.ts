import { instance } from './instance';

export const downloadExcelTemplate = async (eventId: number) => {
  const { data } = await instance.get('/excel/download', {
    params: { eventId },
    responseType: 'blob',
  });
  return data;
};

export const importExcelFile = async (eventId: number, file: File) => {
  const formData = new FormData();
  formData.append('importExcelRequest', new Blob([JSON.stringify({ eventId })], { type: 'application/json' }));
  formData.append('file', file);

  const { data } = await instance.post('/excel', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
