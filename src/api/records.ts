import { TCreateRecordRequest, TCreateRecordResponse, TUpdateRecordRequest } from '@_types/records.type';
import { instance } from './instance';

export const createRecord = async (recordData: TCreateRecordRequest): Promise<TCreateRecordResponse> => {
  const { data } = await instance.post('/event/detail', recordData);
  return data;
};

export const updateRecord = async ({
  recordId,
  recordData,
}: {
  recordId: number;
  recordData: TUpdateRecordRequest;
}): Promise<void> => {
  const { data } = await instance.patch(`/event/detail/${recordId}`, recordData);
  return data;
};

export const deleteRecord = async ({ recordId }: { recordId: number }): Promise<void> => {
  const { data } = await instance.delete(`/event/detail/${recordId}`);
  return data;
};
