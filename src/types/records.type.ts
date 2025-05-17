export interface TRecordFormValues {
  type: string;
  history: string;
  price: string;
  name?: string;
  tags?: string[];
  imageUrl?: string;
  imageFile?: File | null;
  target?: string;
  sendType?: string;
  contact?: string;
}

export type TRecordFormErrors = Partial<Record<keyof TRecordFormValues, boolean>>;

export interface TCreateRecordRequest extends TRecordFormValues {
  eventId: number;
}

export type TUpdateRecordRequest = TRecordFormValues;

export interface TRecordItem extends TRecordFormValues {
  eventDetailId: number;
  image: string;
}

export interface TRecordDetailResponse extends TRecordItem {
  tags: string[];
  imageUrl: string;
  sendType: 'EMAIL' | 'PHONE';
  amountUnit: string;
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

export interface TRecordSummaryResponse {
  totalDeposit: number;
  totalWithdrawal: number;
}
