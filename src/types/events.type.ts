export interface TEventItem {
  eventId: number;
  eventName: string;
  eventDate: string;
  eventType: string;
  thumbnailUrl: string;
  address: string;
}

export interface TEventListRequest {
  memberId: number;
  lastEventId: number;
  pageSize: number;
}

export interface TEventListResponse {
  events: TEventItem[];
  lastEventId: number;
}

export interface TEventDetailResponse extends TEventItem {
  participants: number;
  eventInfoItems: string[];
}

export interface TCreateEventRequest extends TUpdateEventRequest {
  memberId: number;
}

export type TCreateEventResponse = number;

export interface TUpdateEventRequest {
  thumbnailUrl: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  address: string;
  latitude: number;
  longitude: number;
  participants: number | '';
  isType: boolean;
  isHistory: boolean;
  isPrice: boolean;
  isName: boolean;
  tags: string[];
  isImage: boolean;
  targets: string[];
  isSend: boolean;
  sendType: 'EMAIL' | 'PHONE' | null;
  sendTypeValid: boolean;
}
