export interface TEvent extends TCreateEvent {
  id: string;
  status: 'draft' | 'active' | 'archived';
}

export interface TCreateEvent {
  thumbnail: string | null;
  name: string;
  type: 'wedding' | 'funeral' | 'other';
  otherTypeName?: string | null;
  date: string;
  location: string;
  guests: number;
  details: TEventDetails;
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
