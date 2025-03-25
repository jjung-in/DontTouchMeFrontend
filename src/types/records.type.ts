export interface TCreateRecordRequest extends TUpdateRecordRequest {
  eventId: number;
}

export type TCreateRecordResponse = number;

export interface TUpdateRecordRequest {
  type: string;
  history: string;
  price: string;
  name?: string;
  tags?: string[];
  imageUrl?: string;
  target?: string;
  sendType?: string;
  contact?: string;
}
