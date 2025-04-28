import {
  TCreateEventRequest,
  TEventDetailResponse,
  TEventListRequest,
  TEventListResponse,
  TUpdateEventRequest,
} from '@_types/events.type';
import { instance } from './instance';

export const getEventList = async (params: TEventListRequest): Promise<TEventListResponse> => {
  const { data } = await instance.get('/event/list', { params });
  return data;
};

export const getEventDetail = async (eventId: number): Promise<TEventDetailResponse> => {
  const { data } = await instance.get(`/event/${eventId}`);
  return data;
};

export const createEvent = async (eventData: TCreateEventRequest): Promise<number> => {
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
  await instance.patch(`/event/${eventId}`, eventData);
};

export const deleteEvent = async ({ eventId }: { eventId: number }): Promise<void> => {
  await instance.delete(`/event/${eventId}`);
};
