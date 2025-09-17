import { Link, useNavigate } from 'react-router-dom';
import { IAiAssistanceChatInfo, IChatSession } from '../../../utils/types/IAiassistance';
import { useState } from 'react';
import { Menu, X, MessageSquare, Bot } from 'lucide-react';

interface Props {
  chats: IAiAssistanceChatInfo[];
  onNewChat: () => void;
  activeChat:IChatSession|null
}

export default function AssistanceSidebar({ chats, onNewChat,activeChat}: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        className="absolute z-50 p-2 rounded-md text-primary-content bg-primary top-2 left-2 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div
        className={`
          fixed left-0 z-40 w-64 transform bg-base-100 border-r shadow-lg
          transition-transform duration-200 ease-in-out
          md:static md:translate-x-0
          md:bg-base-100/50 
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ top: '64px', height: 'calc(100vh - 64px)' }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="">
            <Bot className="w-5 h-5 mx-auto text-primary" />
            <h1 className="mt-2 mb-5 text-xl font-bold text-primary">ServEase AI Chatbot</h1>
          </div>
          <button
            onClick={onNewChat}
            className="w-full py-2 mb-4 text-sm font-medium transition rounded-lg text-primary-content bg-primary hover:bg-primary/50"
          >
            + New Chat
          </button>


          <div className="flex-1 space-y-1 overflow-y-auto">
            {chats.length > 0 ? (
              chats.map(chat => (
                <Link key={chat._id} to={`/service-provider/assistance/${chat._id}`}>
                  <div
                    onClick={() => {
                      if (chat._id) {
                        navigate(`/assistance/${chat._id}`);
                        setOpen(false); 
                      }
                    }}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition
                      ${

                         chat._id==activeChat?._id
                          ? 'bg-primary/50 border-l-4 border-primary font-medium'
                          : 'hover:bg-base-300/40'
                      }
                    `}
                  >
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="truncate text-base-content">{chat.title || 'Untitled Chat'}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="mt-10 text-sm text-center text-primary">No chats yet. Start one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
