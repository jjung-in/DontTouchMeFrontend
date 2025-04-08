import { createRecord, deleteRecord, updateRecord } from '@_api/records';
import { TCreateRecordRequest } from '@_types/records.type';
import { useMutation } from '@tanstack/react-query';

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
