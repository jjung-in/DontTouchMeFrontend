import { TCreateEvent, TEvent } from '@_types/events.type';
import { instance } from './instance';

export const getEventList = async (): Promise<TEvent[]> => {
  try {
    const { data } = await instance.get('/event/list');
    return data;
  } catch (error) {
    console.error('Error fetching event list:', error);
    throw error;
  }
};

export const getEventDetail = async (eventId: number): Promise<TEvent> => {
  try {
    const { data } = await instance.get(`/event/${eventId}`);
    return data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const createEvent = async (eventData: TCreateEvent): Promise<TEvent> => {
  try {
    const { data } = await instance.post('/event', eventData);
    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId: number, eventData: TCreateEvent): Promise<TEvent> => {
  try {
    const { data } = await instance.patch(`/event/${eventId}`, eventData);
    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: number): Promise<void> => {
  try {
    const { data } = await instance.delete(`/event/${eventId}`);
    console.log(data);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
