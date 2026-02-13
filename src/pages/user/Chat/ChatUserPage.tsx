import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connectSocket, getSocket, disconnectSocket } from '../../../utils/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { EmojiClickData } from 'emoji-picker-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getAllchats, getServiceProviderProfile } from '../../../components/User/chat/getAllchats';
import { uploadImage } from '../../../components/User/chat/uploadImg';
import { IMessage } from '../../../utils/types/IChat';
import ChatMessage from '../../../components/ui/chat/ChatMessage';
import ChatInput from '../../../components/ui/chat/ChatInput';
import InitialAvatar from '../../../utils/ui/InitialAvatar';

dayjs.extend(relativeTime);

interface UserData {
  userAvatar?: string;
  userName: string;
}

const ChatUser = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { serviceProviderId } = useParams();
  const user = useSelector((store: RootState) => store.user);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [serviceProvider, setServiceProvider] = useState<UserData | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (serviceProviderId) {
        try {
          const userRes: any = await getServiceProviderProfile(serviceProviderId);
          if (userRes.status === 200) {
            setServiceProvider(userRes.data);
          }
        } catch (error) {
          console.error('Error fetching service provider profile:', error);
        }
      }
    };
    fetchProfile();
  }, [serviceProviderId]);

  useEffect(() => {
    if (!user._id || !serviceProviderId) return;

    const fetchData = async (): Promise<void> => {
      try {
        const res: any = await getAllchats(user._id + '', serviceProviderId + '');
        if (res.status === 200) {
          const chatData = res.data.data.data;
          setMessages(chatData.messages);

          const presence = chatData.presence;
          if (presence && presence.length > 0) {
            const providerPresence = presence.find((i: any) => i.userId !== user._id);

            if (providerPresence) {
              setIsOnline(providerPresence.online);
              if (!providerPresence.online && providerPresence.lastSeen) {
                setLastSeen(providerPresence.lastSeen);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [user._id, serviceProviderId]);

  useEffect(() => {
    if (!user._id || !serviceProviderId) return;

    const socket = connectSocket();

    socket.emit('join_chat', {
      senderId: user._id,
      serviceProviderId,
    });

    socket.on('serviceProvider_online', () => {
      socket.emit('makeItOnline', {
        onlineId: user._id,
        receiverId: serviceProviderId,
      });
      setIsOnline(true);
      setLastSeen(null);
    });

    socket.on('serviceProvider_offline', (data: { lastSeen: string }) => {
      setIsOnline(false);
      setLastSeen(data.lastSeen);
    });

    socket.on('receive_message', (data: { message: IMessage }) => {
      const { message } = data;

      setMessages(prev => [
        ...prev,
        {
          sender: message.sender,
          status: message.status,
          id: message.id,
          content: message.content,
          timestamp: Date.now(),
          messageType: message.messageType,
        },
      ]);

      if (message.sender === 'serviceProvider') {
        socket.emit('message_seen', {
          chatId: message.id,
          messageId: message.id,
          seenBy: user._id,
        });
      }
    });

    socket.on('message_delivered', ({ messageId }: { messageId: string }) => {
      setMessages(prev => prev.map(msg => (msg.id === messageId ? { ...msg, status: 'delivered' } : msg)));
    });

    socket.on('message_read', ({ messageId }: { messageId: string }) => {
      setMessages(prev => prev.map(msg => (msg.id === messageId ? { ...msg, status: 'read' } : msg)));
    });

    return () => {
      socket.emit('leave_chat', {
        senderId: user._id,
        receiverId: serviceProviderId,
        offlineId: user._id,
      });
      disconnectSocket();
    };
  }, [user._id, serviceProviderId]);

  const handleImgUpload = async (img: string) => {
    const imgUrl = await uploadImage(img);
    if (imgUrl) {
      const id = Date.now().toString();

      const message: IMessage = {
        id,
        messageType: 'image',
        content: imgUrl,
        sender: 'user',
        timestamp: Date.now(),
        status: 'sent',
      };

      handleSend(message);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const id = Date.now().toString();
    const message: IMessage = {
      id,
      messageType: 'text',
      content: newMessage,
      sender: 'user',
      timestamp: Date.now(),
      status: 'sent',
    };
    handleSend(message);
  };

  const handleSend = (message: IMessage) => {
    const socket = getSocket();

    socket.emit('send_message', {
      senderId: user._id,
      receiverId: serviceProviderId,
      content: message.content,
      message,
      targetRole: 'SERVICE_PROVIDER',

      senderInfo: { senderName: user.userName, senderProfile: user.profileImage },
    });

    setMessages(prev => [
      ...prev,
      {
        ...message,
        timestamp: message.timestamp,
      },
    ]);

    setNewMessage('');
    inputRef.current?.focus();

    setTimeout(() => {
      setMessages(prev => prev.map(msg => (msg.id === message.id ? { ...msg, status: 'delivered' } : msg)));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => (msg.id === message.id ? { ...msg, status: 'read' } : msg)));
    }, 2000);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatLastSeen = (timestamp: string | null) => {
    if (!timestamp) return '';

    const date = dayjs(timestamp);
    const now = dayjs();

    if (now.diff(date, 'day') <= 1) {
      return `Last seen ${date.fromNow()}`;
    } else {
      return `Last seen on ${date.format('DD MMM, hh:mm A')}`;
    }
  };

  if (!user?._id) return null;

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-[calc(100dvh-64px-130px)]  md:h-[90vh] sm:px-4 sm:py-4">
      <div className="flex flex-col flex-1 min-h-0 bg-base-100 sm:rounded-xl shadow-lg border-x sm:border border-base-300 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 sm:py-3 border-b bg-base-200 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
              <div className=" border-base-300">
                <InitialAvatar
                  name={serviceProvider?.userName || 'provider'}
                  imageSrc={serviceProvider?.userAvatar}
                  size={50}
                />
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold truncate leading-tight">
                {serviceProvider?.userName || 'Service Provider'}
              </h3>
              {isOnline ? (
                <p className="text-[10px] sm:text-xs text-success font-medium">Online</p>
              ) : (
                <p className="text-[10px] sm:text-xs opacity-60 truncate">{formatLastSeen(lastSeen)}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 px-3 sm:px-6 py-4 bg-gradient-to-b from-base-200/30 to-base-100">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-base-content/60">
              <div className="max-w-[280px] p-5 text-center border shadow-sm rounded-2xl bg-base-100">
                <p className="text-xs sm:text-sm italic">
                  Start your conversation with {serviceProvider?.userName || 'Service Provider'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <ChatMessage
                  key={msg.id}
                  msg={msg}
                  currentRole="user"
                  participantAvatar={serviceProvider?.userAvatar}
                  participantName={serviceProvider?.userName}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="shrink-0 border-t bg-base-100 p-2 sm:p-4">
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            handleImgUpload={handleImgUpload}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            onEmojiClick={onEmojiClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
