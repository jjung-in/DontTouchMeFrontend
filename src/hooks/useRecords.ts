import { createRecord, deleteRecord, getRecordDetail, getRecordList, updateRecord } from '@_api/records';
import { TCreateRecordRequest, TRecordDetailResponse, TRecordListResponse } from '@_types/records.type';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export const useRecordList = (eventId: number, pageSize: number) => {
  return useInfiniteQuery<
    TRecordListResponse,
    Error,
    InfiniteData<TRecordListResponse>,
    [string, number],
    number | null
  >({
    queryKey: ['records', eventId],
    queryFn: ({ pageParam }) => getRecordList({ eventId, lastEventDetailId: pageParam, pageSize }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.eventDetails.length > 0 ? lastPage.lastEventDetailId : undefined;
    },
  });
};

export const useRecordDetail = (recordId: number) => {
  return useQuery<TRecordDetailResponse, Error>({
    queryKey: ['records', 'detail', recordId],
    queryFn: () => getRecordDetail(recordId),
  });
};

export const useCreateRecordsBatch = () => {
  return useMutation({
    mutationFn: async (records: TCreateRecordRequest[]) => {
      return await Promise.all(records.map((record) => createRecord(record)));
    },
  });
};

export const useUpdateRecord = () => {
  return useMutation({
    mutationFn: updateRecord,
  });
};

export const useDeleteRecord = () => {
  return useMutation({
    mutationFn: deleteRecord,
  });
};

/*
export const useUpdateRecord = (eventId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['records', eventId],
      });
    },
    onError: (error) => {
      console.error('Error updating record:', error);
    },
  });
};

export const useDeleteRecord = (eventId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['records', eventId],
      });
    },
    onError: (error) => {
      console.error('Error deleting record:', error);
    },
  });
};
*/
