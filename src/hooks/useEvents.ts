import { createEvent, deleteEvent, getEventDetail, getEventList, updateEvent } from '@_api/events';
import { TEventDetailResponse, TEventListResponse } from '@_types/events.type';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useEventList = (memberId: number, pageSize: number) => {
  return useInfiniteQuery<TEventListResponse, Error, InfiniteData<TEventListResponse>, [string, number], number | null>(
    {
      queryKey: ['events', memberId],
      queryFn: ({ pageParam }) => getEventList({ memberId, lastEventId: pageParam, pageSize }),
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        return lastPage.events.length > 0 ? lastPage.lastEventId : undefined;
      },
    },
  );
};

export const useEventDetail = (eventId: number) => {
  return useQuery<TEventDetailResponse, Error>({
    queryKey: ['events', eventId],
    queryFn: () => getEventDetail(eventId),
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
    onError: (error) => {
      console.error('Error creating event:', error);
    },
  });
};

export const useUpdateEvent = (eventId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events', eventId],
      });
    },
    onError: (error) => {
      console.error('Error updating event:', error);
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
    onError: (error) => {
      console.error('Error deleting event:', error);
    },
  });
};
