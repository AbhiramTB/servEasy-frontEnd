import { useEffect, useState, useRef } from "react";
import { Send, Video, MoreVertical, Smile, Check, Paperclip } from "lucide-react";
import { useParams } from "react-router-dom";
import { connectSocket, getSocket, disconnectSocket } from "../../../utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import dayjs from "dayjs";

// Types
type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: string;
  messageType: string;
  content: string;
  sender: "user" | "serviceProvider";
  timestamp: string;
  status?: MessageStatus;
}

const ChatUser = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { serviceProviderId } = useParams();
  const user = useSelector((store: RootState) => store.user);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [providerName, setProviderName] = useState("Service Provider");
  const [providerStatus] = useState("Online");
  const [providerAvatar] = useState("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp");

  useEffect(() => {
    if (!user?._id || !serviceProviderId) return;

    const socket = connectSocket();

    socket.emit("join_chat", {
      senderId: user._id,
      serviceProviderId,
    });

    socket.on("receive_message", (data: { message: Message }) => {
      setMessages(prev => [...prev, data.message]);
    });

    socket.on("message_delivered", ({ messageId }: { messageId: string }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: "delivered" } : msg
      ));
    });

    socket.on("message_read", ({ messageId }: { messageId: string }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: "read" } : msg
      ));
    });

    return () => {
      socket.emit("leave_chat", {
        senderId: user._id,
        receiverId: serviceProviderId,
      });
      disconnectSocket();
    };
  }, [user._id, serviceProviderId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const socket = getSocket();
    const id = Date.now().toString();

    const message: Message = {
      id,
      messageType: "text",
      content: newMessage,
      sender: "user",
      timestamp: dayjs().format("hh:mm A"),
      status: "sent",
    };

    socket.emit("send_message", {
      senderId: user._id,
      receiverId: serviceProviderId,
      message,
    });

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate delivery and read (demo)
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, status: "delivered" } : msg
      ));
    }, 1000);
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, status: "read" } : msg
      ));
    }, 2000);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const MessageStatus = ({ status }: { status?: MessageStatus }) => {
    if (!status) return null;
    const checkClass = status === "read" ? "text-primary" : "text-base-content/70";

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
      <div className="flex flex-col h-[90vh] rounded-xl shadow-lg overflow-hidden border border-base-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="avatar online">
              <div className="w-12 rounded-full ring ring-primary">
                <img src={providerAvatar} alt={providerName} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">{providerName}</h3>
              <p className="text-xs opacity-90">{providerStatus}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="btn btn-circle btn-ghost btn-sm">
              <Video size={18} />
            </button>
            <button className="btn btn-circle btn-ghost btn-sm">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-base-200 to-base-100">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-base-content/70">
              <div className="max-w-xs p-6 text-center border shadow-md card bg-base-100 border-base-300">
                <h3 className="mb-2 text-lg font-medium">Start your conversation</h3>
                <p className="text-sm">Send a message to begin chatting with {providerName}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"}`}>
                  {msg.sender !== "user" && (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={providerAvatar} alt="avatar" />
                      </div>
                    </div>
                  )}
                  <div className={`chat-bubble ${
                    msg.sender === "user"
                      ? "chat-bubble-primary shadow-md"
                      : "bg-base-100 shadow-md border border-base-300"
                  }`}>
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-1 text-xs chat-footer opacity-70">
                    {msg.timestamp}
                    {msg.sender === "user" && (
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
        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="relative flex items-center w-full">
            <button className="absolute left-4 btn btn-circle btn-ghost">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              className="w-full rounded-full px-14 input input-bordered"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <div className="absolute flex items-center space-x-2 right-4">
              <button className="btn btn-circle btn-ghost" onClick={() => setShowEmojiPicker(prev => !prev)}>
                <Smile size={22} />
              </button>
              <button 
                className={`btn btn-circle ${newMessage.trim() ? 'btn-primary' : 'btn-ghost opacity-50'}`}
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          {showEmojiPicker && (
            <div ref={pickerRef} className="absolute z-20 bottom-20 right-4">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
