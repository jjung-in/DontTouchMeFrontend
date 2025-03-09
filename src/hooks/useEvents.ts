import { createEvent, deleteEvent, getEventDetail, getEventList, getTest, updateEvent } from '@_api/events';
import { TCreateEvent, TEvent } from '@_types/events.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTestRequest = () => {
  return useQuery({
    queryKey: ['test'],
    queryFn: getTest,
  });
};

export const useEventList = () => {
  return useQuery<TEvent[], Error>({
    queryKey: ['events'],
    queryFn: getEventList,
  });
};

export const useEventDetail = (eventId: number) => {
  return useQuery<TEvent, Error>({
    queryKey: ['event', eventId],
    queryFn: () => getEventDetail(eventId),
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent: TCreateEvent) => createEvent(newEvent),
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

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, updatedEvent }: { eventId: number; updatedEvent: TCreateEvent }) =>
      updateEvent(eventId, updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
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
    mutationFn: (eventId: number) => deleteEvent(eventId),
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
