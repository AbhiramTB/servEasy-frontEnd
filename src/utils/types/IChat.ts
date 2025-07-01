export interface IMessage {
  id: string;
  messageType: 'text' | 'image';
  content: string;
  sender: 'user' | 'serviceProvider';
  timestamp: number | string;
  status?: IMessageStatus;
}

export type IMessageStatus = 'sent' | 'delivered' | 'read';
