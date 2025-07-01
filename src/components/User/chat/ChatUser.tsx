import { useEffect, useState, useRef } from 'react';
import { Send, Smile, Check, Paperclip } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { connectSocket, getSocket, disconnectSocket } from '../../../utils/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getAllchats, getServiceProviderProfile } from './getAllchats';

dayjs.extend(relativeTime);

type MessageStatus = 'sent' | 'delivered' | 'read';

interface Message {
  id: string;
  messageType: string;
  content: string;
  sender: 'user' | 'serviceProvider';
  timestamp: number | string;
  status?: MessageStatus;
}

interface UserData {
  userAvatar?: string;
  userName: string;
}

const ChatUser = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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

  // Fetch service provider profile
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

  // Fetch chat history
  useEffect(() => {
    if (!user._id || !serviceProviderId) return;

    const fetchData = async (): Promise<void> => {
      try {
        const res: any = await getAllchats(user._id + '', serviceProviderId + '');
        if (res.status === 200) {
          const chatData = res.data.data.data;
          setMessages(chatData.messages);

          // Handle presence data
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

  // Socket connection and event handlers
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

    socket.on('receive_message', (data: { message: Message }) => {
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

      // Mark messages from service provider as seen
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

  // Handle sending messages
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const socket = getSocket();
    const id = Date.now().toString();

    const message: Message = {
      id,
      messageType: 'text',
      content: newMessage,
      sender: 'user',
      timestamp: Date.now(),
      status: 'sent',
    };

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

    // Simulate delivery and read status (for demo purposes)
    setTimeout(() => {
      setMessages(prev => prev.map(msg => (msg.id === id ? { ...msg, status: 'delivered' } : msg)));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => (msg.id === id ? { ...msg, status: 'read' } : msg)));
    }, 2000);
  };

  // Handle emoji selection
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  // Close emoji picker when clicking outside
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

  const MessageStatus = ({ status }: { status?: MessageStatus }) => {
    if (!status) return null;

    const checkClass = status === 'read' ? 'text-primary' : 'text-base-content/70';

    return (
      <div className="relative">
        <Check size={14} className={`absolute ${checkClass}`} />
        <Check size={14} className={`ml-1 ${checkClass}`} />
      </div>
    );
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

          {/* <div className="flex space-x-3">
            <button className="btn btn-circle btn-ghost">
              <Phone size={18} />
            </button>
            <button className="btn btn-circle btn-ghost">
              <Video size={18} />
            </button>
            <button className="btn btn-circle btn-ghost">
              <MoreVertical size={18} />
            </button>
          </div> */}
        </div>

        {/* Messages Area */}
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
                <div key={msg.id} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                  {msg.sender === 'serviceProvider' && (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={serviceProvider?.userAvatar || import.meta.env.VITE_IMAGE_PLACEHOLDER}
                          alt="Service Provider"
                        />
                      </div>
                    </div>
                  )}

                  <div
                    className={`chat-bubble ${
                      msg.sender === 'user'
                        ? 'chat-bubble-primary text-primary-content'
                        : 'bg-base-200 text-base-content'
                    } shadow-sm`}
                  >
                    {msg.content}
                  </div>

                  <div className="flex items-center gap-1 text-xs chat-footer opacity-70">
                    {dayjs(msg.timestamp).format('hh:mm A')}

                    {msg.sender === 'user' && (
                      <span className="ml-1">
                        <MessageStatus status={msg.status} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 border-t border-base-300 bg-base-200">
          <div className="relative flex items-center w-full">
            <button className="absolute left-4 btn btn-circle btn-ghost btn-sm">
              <Paperclip size={18} />
            </button>

            <input
              ref={inputRef}
              type="text"
              className="w-full py-3 rounded-full px-14 input input-bordered focus:border-primary"
              placeholder="Type a message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />

            <div className="absolute flex items-center space-x-2 right-4">
              <button className="btn btn-circle btn-ghost btn-sm" onClick={() => setShowEmojiPicker(prev => !prev)}>
                <Smile size={20} />
              </button>

              <button
                className={`btn btn-circle btn-sm ${
                  newMessage.trim() ? 'btn-primary text-primary-content' : 'btn-ghost opacity-50'
                }`}
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {showEmojiPicker && (
            <div ref={pickerRef} className="absolute z-20 bottom-20 right-4">
              <EmojiPicker onEmojiClick={onEmojiClick} height={350} width={320} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
