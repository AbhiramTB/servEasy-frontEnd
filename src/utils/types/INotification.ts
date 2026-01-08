export interface IVideoCallNotification {
  type: 'video_call';
  callerId: string;
  callerName: string;
  callerProfile: string;
  callRoomId: string;
  receiverId: string;
}

export interface IChatNotification {
  type: 'chat';
  senderId: string;
  senderName: string;
  senderProfile: string;
  callRoomId: string;
  content: string;
  read: Boolean;
}

export interface INotification {
  type: 'notification';
  content: string;
  read: Boolean;
}

export interface ISavedNotification {
  _id: string;
  content: string;
  notificationTime: string;
  userId: string;
  read: boolean;
}
