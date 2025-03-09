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

export interface TEventDetails {
  transactionCategory: boolean;
  transactionName: boolean;
  amount: boolean;
  name: boolean;
  tag: boolean;
  photoAttachment: boolean;
  depositTarget: boolean;
  thankYouCard: boolean;
  thankYouCardType?: 'email' | 'sms' | null;
}
