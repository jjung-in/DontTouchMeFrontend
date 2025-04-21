export interface TRecipient {
  name: string;
  contact: string;
}

export interface TRecipientWithId extends TRecipient {
  id: string;
}

export interface TRecipientList {
  recipients: TRecipient[];
}

export interface TSendEmailRequest {
  recipients: TRecipient[];
  eventName: string;
  fromEmail: string;
}

export interface TSendSMSRequest {
  recipients: TRecipient[];
  eventName: string;
}
