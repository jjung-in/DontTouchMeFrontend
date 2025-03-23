import { instance } from './instance';

export const downloadExcelTemplate = async (eventId: number) => {
  const { data } = await instance.get('/excel/download', {
    params: { eventId },
    responseType: 'blob',
  });
  return data;
};
