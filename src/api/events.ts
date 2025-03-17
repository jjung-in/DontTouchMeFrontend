import {
  TCreateEventRequest,
  TCreateEventResponse,
  TEventDetailResponse,
  TEventListResponse,
  TUpdateEventRequest,
} from '@_types/events.type';
import { instance } from './instance';

export const getEventList = async (): Promise<TEventListResponse> => {
  const { data } = await instance.get('/event/list');
  return data;
};

export const getEventDetail = async (eventId: number): Promise<TEventDetailResponse> => {
  const { data } = await instance.get(`/event/${eventId}`);
  return data;
};

export const createEvent = async (eventData: TCreateEventRequest): Promise<TCreateEventResponse> => {
  const { data } = await instance.post('/event', eventData);
  return data;
};

export const updateEvent = async ({
  eventId,
  eventData,
}: {
  eventId: number;
  eventData: TUpdateEventRequest;
}): Promise<void> => {
  const { data } = await instance.patch(`/event/${eventId}`, eventData);
  return data;
};

export const deleteEvent = async ({ eventId }: { eventId: number }): Promise<void> => {
  const { data } = await instance.delete(`/event/${eventId}`);
  return data;
};
