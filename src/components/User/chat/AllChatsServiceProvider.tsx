import React, { useEffect, useState } from 'react';
import { fetchAllChats } from './getAllchats';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Video } from 'lucide-react';
import { IMessage } from '../../../utils/types/IChat';

interface ChatItem {
  _id: string;
  userName: string;
  lastMessage: IMessage;
  lastMessageAt: string;
  userAvatar?: string;
  userID: String;
}

const ChatUI: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const serviceProviderId = useSelector((state: RootState) => state.serviceProvider.userId);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await fetchAllChats({ serviceProviderId });
      console.log(res);

      if (res?.status === 200 && Array.isArray(res.data)) {
        setChats(res.data);
      } else {
        setChats([]);
      }
    }

    if (serviceProviderId) fetchData();
  }, [serviceProviderId]);

  const filteredChats = chats?.filter(chat => chat.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-base-300 text-base-content">
      {/* Sidebar */}
      <div className="overflow-y-auto border-r w-80 border-base-200">
        <div className="p-4 text-lg font-bold border-b border-base-200 bg-base-200">
          <h2 className="text-primary">All Chats</h2>
        </div>

        {/* Search Input */}
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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
            filteredChats?.map(chat => (
              <div key={chat._id} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-base-200">
                <Link to={'/service-provider/chat/' + chat.userID}>
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
                      {chat.lastMessage.messageType === 'image' ? (
                        <div className="flex pl-2">
                          <Image />
                          <span className="pl-2">image</span>
                        </div>
                      ) : (
                        <span className="pl-2">{chat.lastMessage.content}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">
                      {new Date(chat.lastMessageAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => navigate(`/service-provider/video-call/${chat.userID}`)}
                  className="btn btn-circle btn-ghost"
                >
                  <Video size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Screen */}
      <div className="flex items-center justify-center flex-1 text-lg text-opacity-70">
        <div className="p-8 shadow-xl">
          <h2 className="card-title text-primary">Welcome to Chat</h2>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
