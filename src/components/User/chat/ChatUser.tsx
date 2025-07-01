import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connectSocket, getSocket, disconnectSocket } from '../../../utils/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { EmojiClickData } from 'emoji-picker-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getAllchats, getServiceProviderProfile } from './getAllchats';
import { uploadImage } from './uploadImg';
import { IMessage } from '../../../utils/types/IChat';
import ChatMessage from '../../ui/chat/ChatMessage';
import ChatInput from '../../ui/chat/ChatInput';

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
            console.log(userRes);

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
      message,
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
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col h-[90vh] rounded-xl shadow-lg overflow-hidden border border-base-300 bg-base-100">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-base-200">
          <div className="flex items-center space-x-4">
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
              <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={serviceProvider?.userAvatar || import.meta.env.VITE_IMAGE_PLACEHOLDER}
                  alt={serviceProvider?.userName || 'Service Provider'}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold">{serviceProvider?.userName || 'Service Provider'}</h3>
              {isOnline ? (
                <p className="text-xs text-success">Online</p>
              ) : (
                <p className="text-xs opacity-70">{formatLastSeen(lastSeen)}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-base-200/50 to-base-100">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-base-content/70">
              <div className="max-w-xs p-6 text-center border shadow-md card bg-base-100 border-base-300">
                <h3 className="mb-2 text-lg font-medium">Start your conversation</h3>
                <p className="text-sm">
                  Send a message to begin chatting with {serviceProvider?.userName || 'Service Provider'}
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
  );
};

export default ChatUser;
