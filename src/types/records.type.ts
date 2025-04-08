export interface TRecordItem {
  eventDetailId: number;
  type: string;
  history: string;
  price: string;
  name: string;
  image: string;
  contact: string;
}

export interface TRecordListRequest {
  eventId: number;
  lastEventDetailId: number | null;
  pageSize: number;
}

export interface TRecordListResponse {
  eventDetails: TRecordItem[];
  lastEventDetailId: number;
}

export interface TRecordDetailResponse extends TRecordItem {
  tags: string[];
  imageUrl: string;
  sendType: 'EMAIL' | 'PHONE';
  amountUnit: string;
}

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
