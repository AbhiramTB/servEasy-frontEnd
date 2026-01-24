import { useEffect, useState, useRef } from 'react';
import { Video } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { connectSocket, getSocket, disconnectSocket } from '../../../utils/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { EmojiClickData } from 'emoji-picker-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getAllchats } from './getAllchats';
import { getRequest } from '../../../utils/makeRequestInstance';
import { IMessage } from '../../../utils/types/IChat';
import { uploadImage } from './uploadImg';
import ChatMessage from '../../ui/chat/ChatMessage';
import ChatInput from '../../ui/chat/ChatInput';
import InitialAvatar from '../../../utils/ui/InitialAvatar';

dayjs.extend(relativeTime);

interface UserData {
  userAvatar?: string;
  userName: string;
}

const ChatServiceProvider = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { userid } = useParams();
  const serviceProvider = useSelector((store: RootState) => store.serviceProvider);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImgUpload = async (img: string) => {
    const imgUrl = await uploadImage(img);

    if (imgUrl) {
      const id = Date.now().toString();

      const message: IMessage = {
        id,
        messageType: 'image',
        content: imgUrl,
        sender: 'serviceProvider',
        timestamp: Date.now(),
        status: 'sent',
      };

      handleSend(message);
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (userid) {
          getProfile(userid);
        }

        const chatRes: any = await getAllchats(userid + '', serviceProvider.userId + '');

        if (chatRes.status === 200) {
          const chatData = chatRes.data.data.data;
          setMessages(chatData.messages);

          // Handle presence data
          const presence = chatData.presence;
          if (presence && presence.length > 0) {
            const userPresence = presence.find((i: any) => i.userId !== serviceProvider.userId);

            if (userPresence) {
              setIsOnline(userPresence.online);
              if (!userPresence.online && userPresence.lastSeen) {
                setLastSeen(userPresence.lastSeen);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userid, serviceProvider.userId]);

  // Socket connection and event handlers
  useEffect(() => {
    if (!serviceProvider.userId || !userid) return;

    const socket = connectSocket();

    socket.emit('join_chat', {
      senderId: serviceProvider.userId,
      serviceProviderId: userid,
    });

    socket.on('user_online', () => {
      setIsOnline(true);
      setLastSeen(null);
      socket.emit('makeItOnline', {
        onlineId: serviceProvider.userId,
        receiverId: userid,
      });
    });

    socket.on('user_offline', (data: { lastSeen: string }) => {
      setIsOnline(false);
      setLastSeen(data.lastSeen);
    });

    socket.on('receive_message', (data: { message: IMessage }) => {
      const { message } = data;
      setMessages(prev => [...prev, message]);
    });

    socket.on('message_delivered', ({ messageId }: { messageId: string }) => {
      setMessages(prev => prev.map(msg => (msg.id === messageId ? { ...msg, status: 'delivered' } : msg)));
    });

    socket.on('message_read', ({ messageId }: { messageId: string }) => {
      setMessages(prev => prev.map(msg => (msg.id === messageId ? { ...msg, status: 'read' } : msg)));
    });

    return () => {
      socket.emit('leave_chat', {
        senderId: serviceProvider.userId,
        receiverId: userid,
        offlineId: serviceProvider.userId,
      });
      disconnectSocket();
    };
  }, [userid, serviceProvider.userId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const id = Date.now().toString();
    const message: IMessage = {
      id,
      messageType: 'text',
      content: newMessage,
      sender: 'serviceProvider',
      timestamp: Date.now(),
      status: 'sent',
    };
    handleSend(message);
  };

  const handleSend = (message: IMessage) => {
    const socket = getSocket();

    socket.emit('send_message', {
      senderId: serviceProvider.userId,
      receiverId: userid,
      message: message,
      targetRole: 'USER',
      senderInfo: { senderName: serviceProvider.serviceProviderName, senderProfile: serviceProvider.profileImage },
    });

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    inputRef.current?.focus();

    setTimeout(() => {
      setMessages(prev => prev.map(msg => (msg.id === message.id ? { ...msg, status: 'delivered' } : msg)));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => (msg.id === message.id ? { ...msg, status: 'read' } : msg)));
    }, 2000);
  };

  const getProfile = async (id: string) => {
    try {
      const res = await getRequest('/user/profile/' + id);
      if (res.status === 200) {
        setUserData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
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

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col h-[90vh] rounded-xl shadow-xl overflow-hidden border border-base-300 bg-base-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center gap-4">
            <InitialAvatar
              name={userData?.userName || 'User'}
              imageSrc={userData?.userAvatar}
              bgColor="bg-primary"
              textColor="text-primary-content"
            />

            <div>
              <h3 className="text-lg font-bold text-base-content">{userData?.userName || 'User'}</h3>
              {isOnline ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                  <p className="text-xs text-success font-medium">Online</p>
                </div>
              ) : (
                <p className="text-xs text-base-content/60">{formatLastSeen(lastSeen)}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/service-provider/video-call/${userid}`)}
              className="btn btn-ghost btn-circle hover:bg-primary/10"
              aria-label="Start video call"
            >
              <Video size={20} className="text-primary" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-base-100">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="card max-w-md bg-base-200 shadow-lg border border-base-300">
                <div className="card-body text-center">
                  <h3 className="card-title justify-center text-primary">Start your conversation</h3>
                  <p className="text-sm text-base-content/70">
                    Send a message to begin chatting with {userData?.userName || 'User'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <ChatMessage
                  key={msg.id}
                  msg={msg}
                  currentRole="serviceProvider"
                  participantAvatar={userData?.userAvatar}
                  participantName={userData?.userName}
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

export default ChatServiceProvider;
