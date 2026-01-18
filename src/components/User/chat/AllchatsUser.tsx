import React, { useEffect, useState } from 'react';
import { fetchAllChats } from './getAllchats';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';
import { IMessage } from '../../../utils/types/IChat';

interface ChatItem {
  _id: string;
  userName: string;
  unread: boolean;
  lastMessage: IMessage;
  lastMessageAt: string;
  userAvatar?: string;
  userId: string;
}

const ChatsUser: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = useSelector((state: RootState) => state.user._id);

  useEffect(() => {
<<<<<<< HEAD
    async function fetchData() {
      const res = await fetchAllChats({ userId });
      console.log(res);

=======
    const fetchData = async () => {
      const res = await fetchAllChats({ userId });
<<<<<<< HEAD

=======
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
      if (res?.status === 200 && Array.isArray(res.data)) {
        setChats(res.data);
      } else {
        setChats([]);
      }
<<<<<<< HEAD
    }
=======
    };
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6

    if (userId) fetchData();
  }, [userId]);

<<<<<<< HEAD
  const filteredChats: ChatItem[] =
    chats?.filter(chat => chat.userName.toLowerCase().includes(searchTerm.toLowerCase())) || [];
  console.log(chats);

=======
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
  useEffect(() => {
    localStorage.setItem('chatNotificationCount', '0');
  }, []);

<<<<<<< HEAD
  return (
    <div className="flex h-screen bg-base-300 text-base-content">
      {/* Sidebar */}
      <div className="overflow-y-auto border-r w-80 border-base-200">
        <div className="p-4 text-lg font-bold border-b border-base-200 bg-base-200">
          <h2 className="text-primary">All Chats</h2>
        </div>

        {/* Search Input */}
        <div className="px-4 py-2">
=======
  const filteredChats: ChatItem[] =
    chats?.filter(chat => chat.userName.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  return (
    <div className="flex flex-col h-screen md:flex-row bg-base-300 text-base-content">
      {/* Sidebar */}
      <div className="flex flex-col w-full border-r md:w-80 border-base-200">
        <div className="sticky top-0 z-10 p-4 border-b bg-primary/5 border-base-200">
          <h2 className="mb-2 text-xl font-bold text-primary">Chats</h2>
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
<<<<<<< HEAD
            className="w-full input input-sm input-bordered"
          />
        </div>

        <div className="menu menu-sm">
          {chats === null ? (
            <div className="flex justify-center p-4">
              <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
          ) : filteredChats?.length === 0 ? (
            <div className="p-4 text-sm text-center opacity-50">No chats found</div>
          ) : (
            filteredChats?.map(chat => {
              return (
                <Link to={'/chat/' + chat.userId}>
                  <div key={chat._id} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-base-200">
                    <img
                      src={
                        chat.userAvatar ||
                        'https://ui-avatars.com/api/?name=' + encodeURIComponent(chat.userName) + '&background=random'
                      }
                      alt={chat.userName}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{chat.userName}</div>
                      <div className="w-48 text-xs truncate opacity-70">
                        <div className="w-48 text-xs truncate opacity-70">
                          {chat.lastMessage.messageType === 'image' ? (
                            <div className="flex pl-2">
                              <Image />
                              <span className="pl-2">image</span>
                            </div>
                          ) : (
                            <span className="pl-2">{chat.lastMessage.content}</span>
                          )}
                        </div>{' '}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-70">
                        {new Date(chat.lastMessageAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>

                      <div>{chat.unread && <span className="inline-block w-2 h-2 ml-1 bg-red-500 rounded-full" />}</div>
                    </div>
                  </div>
                </Link>
              );
            })
=======
            className="w-full input input-bordered input-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto bg-primary/5">
          {chats === null ? (
            <div className="flex justify-center p-6">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="p-6 text-sm text-center opacity-60">No chats found.</div>
          ) : (
            filteredChats.map(chat => (
              <Link to={`/chat/${chat.userId}`} key={chat._id}>
                <div className="flex items-center gap-3 p-4 transition-all border-b cursor-pointer border-base-200 hover:bg-base-100">
                  <img
                    src={
                      chat.userAvatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.userName)}&background=random`
                    }
                    alt={chat.userName}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm font-semibold truncate">{chat.userName}</div>
                    <div className="flex items-center gap-1 text-xs truncate opacity-70">
                      {chat.lastMessage.messageType === 'image' ? (
                        <span className="flex items-center gap-1">
                          <Image className="w-4 h-4" />
                          image
                        </span>
                      ) : (
                        <span>{chat.lastMessage.content}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-right whitespace-nowrap opacity-70">
                    {new Date(chat.lastMessageAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {chat.unread && <div className="w-2 h-2 mt-1 ml-auto bg-red-500 rounded-full" />}
                  </div>
                </div>
              </Link>
            ))
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
          )}
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex items-center justify-center flex-1 text-lg text-opacity-70">
        <div className="p-8 shadow-xl">
          <h2 className="card-title text-primary">Welcome to Chat</h2>
          <p>Select a chat to start messaging</p>
=======
      {/* Main Content */}
      <div className="flex items-center justify-center flex-1 p-8 text-center">
        <div className="max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-primary">Welcome to Chat</h2>
          <p className="text-sm opacity-70">
            Connect with service providers and discuss your service requirements in real-time.
          </p>
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
        </div>
      </div>
    </div>
  );
};

export default ChatsUser;
