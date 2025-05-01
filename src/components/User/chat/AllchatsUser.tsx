import React, { useEffect, useState } from "react";
import { fetchAllChats } from "./getAllchats";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";

interface ChatItem {
  _id: string;
  userName: string;
  lastMessage: {
    content: string;
    timestamp: string;
    sender: string;
    messageType: string;
    _id: string;
  };
  lastMessageAt: string;
  userAvatar?: string;
  userId:string
  presence: any[];
}

const ChatsUser: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = useSelector((state: RootState) => state.user._id);

  useEffect(() => {
    async function fetchData() {
      const res = await fetchAllChats({ userId });
      console.log(res);

      if (res?.status === 200 && Array.isArray(res.data)) {
        setChats(res.data);
      } else {
        setChats([]);
      }
    }

    if (userId) fetchData();
  }, [userId]);

  const filteredChats = chats?.filter(chat =>
    chat.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
            filteredChats?.map((chat) => (
                <Link to={"/chat/"+chat.userId}>
              <div
                key={chat._id}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-base-200"
                >
                <img
                  src={
                      chat.userAvatar ||
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(chat.userName) +
                      "&background=random"
                    }
                    alt={chat.userName}
                    className="object-cover w-10 h-10 rounded-full"
                    />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{chat.userName}</div>
                  <div className="w-48 text-xs truncate opacity-70">
                    {chat.lastMessage?.content || "No message yet"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-70">
                    {new Date(chat.lastMessageAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
           
                    </Link>
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

export default ChatsUser;
