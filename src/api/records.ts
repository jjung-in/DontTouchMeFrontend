import {
  TCreateRecordRequest,
  TCreateRecordResponse,
  TRecordDetailResponse,
  TRecordListRequest,
  TRecordListResponse,
  TUpdateRecordRequest,
} from '@_types/records.type';
import { instance } from './instance';

export const getRecordList = async (params: TRecordListRequest): Promise<TRecordListResponse> => {
  const { data } = await instance.get('/event/detail/list', { params });
  return data;
};

export const getRecordDetail = async (recordId: number): Promise<TRecordDetailResponse> => {
  const { data } = await instance.get(`/event/detail/${recordId}`);
  return data;
};

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
