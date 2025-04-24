import { createEvent, deleteEvent, getEventDetail, getEventList, updateEvent } from '@_api/events';
import { useToastStore } from '@_store/toastStore';
import { TEventDetailResponse, TEventListResponse } from '@_types/events.type';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useEventList = (memberId: number, pageSize: number) => {
  return useInfiniteQuery<TEventListResponse, Error, InfiniteData<TEventListResponse>, [string, number], number | null>(
    {
      queryKey: ['events', memberId],
      queryFn: ({ pageParam }) => getEventList({ memberId, lastEventId: pageParam, pageSize }),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: true,
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        return lastPage.events.length > 0 ? lastPage.lastEventId : undefined;
      },
    },
  );
};

export const useEventDetail = (eventId: number) => {
  return useQuery<TEventDetailResponse, Error>({
    queryKey: ['events', 'detail', eventId],
    queryFn: () => getEventDetail(eventId),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
  });
};

export const useCreateEvent = (memberId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events', memberId],
      });
      useToastStore.getState().showToast('이벤트가 생성되었습니다.');
    },
    onError: () => {
      useToastStore.getState().showToast('이벤트 생성에 실패했습니다.', 'error');
    },
  });
};

export const useUpdateEvent = (eventId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events', 'detail', eventId],
      });
      useToastStore.getState().showToast('이벤트 정보가 수정되었습니다.');
    },
    onError: () => {
      useToastStore.getState().showToast('이벤트 수정에 실패했습니다.', 'error');
    },
  });
};

export const useDeleteEvent = (memberId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events', memberId],
      });
      useToastStore.getState().showToast('이벤트가 삭제되었습니다.');
    },
    onError: () => {
      useToastStore.getState().showToast('이벤트 삭제에 실패했습니다.', 'error');
    },
  });
};
