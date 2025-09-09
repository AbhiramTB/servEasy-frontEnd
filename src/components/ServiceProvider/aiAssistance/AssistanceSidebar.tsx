import { useNavigate, useParams } from "react-router-dom";
import { IChatSession } from "../../../utils/types/IAiassistance";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger & close icons

interface Props {
  chats: IChatSession[];
  onNewChat: () => void;
}

export default function AssistanceSidebar({ chats, onNewChat }: Props) {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button (fixed top-left) */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute z-50 p-2 rounded-md top-4 left-4 bg-base-200 md:hidden"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform bg-base-200 p-4 transition-transform duration-200 ease-in-out
          md:static md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={onNewChat}
          className="w-full p-2 mb-4 rounded-lg bg-success hover:bg-success/50"
        >
          + New Chat
        </button>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                navigate(`/assistance/${chat.id?chat.id:""}`);
                setOpen(false); 
              }}
              className={`p-2 rounded-lg cursor-pointer ${
                chatId === chat.id ? "bg-primary/15" : "hover:bg-primary/50"
              }`}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
