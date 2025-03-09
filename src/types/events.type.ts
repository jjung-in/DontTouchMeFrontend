export interface TEvent extends TCreateEvent {
  id: number;
  status: 'draft' | 'active' | 'archived';
}

export interface TCreateEvent {
  memberId: number;
  thumbnailUrl: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  address: string;
  latitude: number;
  longitude: number;
  participants: number | null;
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

export interface TEventDetail {
  thumbnailUrl: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  address: string;
  participants: number;
  eventInfoItems: string[];
}
