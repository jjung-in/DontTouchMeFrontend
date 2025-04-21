import { TRecipientList, TSendEmailRequest } from '@_types/cards.type';
import { instance } from './instance';

export const getRecipients = async (eventId: number): Promise<TRecipientList> => {
  const { data } = await instance.get(`/send/recipient/list`, { params: { eventId } });
  return data;
};

export const sendEmail = async (sendData: TSendEmailRequest): Promise<string> => {
  const { data } = await instance.post('/send/email', sendData);
  return data;
};
