import { createRecord, deleteRecord, getRecordDetail, getRecordList, updateRecord } from '@_api/records';
import { useToastStore } from '@_store/toastStore';
import { TCreateRecordRequest, TRecordDetailResponse, TRecordListResponse } from '@_types/records.type';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
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

export const useCreateRecordsBatch = (eventId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (records: TCreateRecordRequest[]) => {
      return await Promise.all(records.map((record) => createRecord(record)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['records', eventId],
      });
      useToastStore.getState().showToast('입출금 내역이 등록되었습니다.');
    },
    onError: () => {
      useToastStore.getState().showToast('입출금 내역 등록에 실패했습니다.', 'error');
    },
  });
};

export const useUpdateRecord = (eventId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['records', eventId],
      });
      useToastStore.getState().showToast('입출금 내역이 수정되었습니다.');
    },
    onError: () => {
      useToastStore.getState().showToast('입출금 내역 수정에 실패했습니다.', 'error');
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
      useToastStore.getState().showToast('입출금 내역이 삭제되었습니다.');
    },
    onError: () => {
      useToastStore.getState().showToast('입출금 내역 삭제에 실패했습니다.', 'error');
    },
  });
};
