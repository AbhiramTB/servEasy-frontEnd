import React, { useEffect, useState } from 'react';
import { fetchAllChats } from './getAllchats';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Video } from 'lucide-react';
import { IMessage } from '../../../utils/types/IChat';
import InitialAvatar from '../../../utils/ui/InitialAvatar';

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
    <div className="flex h-screen bg-base-100">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-base-200 border-r border-base-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-base-300 bg-base-200">
          <h2 className="text-lg font-bold text-primary">All Chats</h2>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full input input-bordered input-sm bg-base-100 focus:input-primary"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats === null ? (
            <div className="flex justify-center items-center p-8">
              <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
          ) : filteredChats?.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-base-content/60">No chats found</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredChats?.map(chat => (
                <div
                  key={chat._id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition-colors border border-transparent hover:border-base-300"
                >
                  <Link to={'/service-provider/chat/' + chat.userID} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <InitialAvatar
                        name={chat.userName}
                        imageSrc={chat.userAvatar}
                        bgColor="bg-primary"
                        textColor="text-primary-content"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-base-content">{chat.userName}</div>
                      <div className="text-xs text-base-content/70 truncate">
                        {chat.lastMessage.messageType === 'image' ? (
                          <span className="flex items-center gap-1">
                            <Image size={14} />
                            <span>Photo</span>
                          </span>
                        ) : (
                          <span>{chat.lastMessage.content}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs text-base-content/60">
                        {new Date(chat.lastMessageAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => navigate(`/service-provider/video-call/${chat.userID}`)}
                    className="btn btn-ghost btn-sm btn-circle flex-shrink-0"
                    aria-label="Start video call"
                  >
                    <Video size={18} className="text-primary" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center bg-base-100">
        <div className="card bg-base-200 shadow-xl max-w-md">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-primary text-2xl">Welcome to Chat</h2>
            <p className="text-base-content/70">Select a conversation from the list to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
