import { useEffect, useState, useRef } from "react";
import { Send, Phone, Video, MoreVertical, Smile, Check, Paperclip } from "lucide-react";
import { useParams } from "react-router-dom";
import { connectSocket, getSocket, disconnectSocket } from "../../../utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import dayjs from "dayjs";  // Import Day.js

// Message status types
type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  messageType: "text" | "image" | "file"; // Adjust according to message type
  content: string;
  sender: "user" | "serviceProvider";
  timestamp?: string;
  status?: MessageStatus;
}

const ChatServiceProvider = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { userid } = useParams();
  const serviceProvider = useSelector((store: RootState) => store.user);
  const serviceProviderId = serviceProvider._id;
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [providerName, setProviderName] = useState("Service Provider");
  const [providerStatus, setProviderStatus] = useState("Online");
  const [providerAvatar, setProviderAvatar] = useState("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp");

  useEffect(() => {
    if (!serviceProviderId || !userid) return;

    const socket = connectSocket();

    socket.emit("join_chat", {
      senderId: serviceProviderId,
      receiverId: userid,
    });

    socket.on("receive_message", ({ message }: { message: Message }) => {
      console.log("Message received!", message);
      const timeString = dayjs().format("hh:mm A");  // Format time using Day.js
      setMessages((prev) => [
        ...prev,
        { ...message, timestamp: timeString }
      ]);
    });

    socket.on("message_delivered", ({ messageId }: { messageId: string }) => {  // messageId as string
      setMessages((prev) =>
        prev.map((msg) =>
          msg.timestamp === messageId ? { ...msg, status: "delivered" } : msg
        )
      );
    });

    socket.on("message_read", ({ messageId }: { messageId: string }) => {  // messageId as string
      setMessages((prev) =>
        prev.map((msg) =>
          msg.timestamp === messageId ? { ...msg, status: "read" } : msg
        )
      );
    });

    return () => {
      socket.emit("leave_chat", {
        senderId: serviceProviderId,
        receiverId: userid,
      });
      socket.off("receive_message");
      socket.off("message_delivered");
      socket.off("message_read");
      disconnectSocket();
    };
  }, [serviceProviderId, userid]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const socket = getSocket();
    const timeString = dayjs().format("hh:mm A");  // Format time using Day.js
    const messageId: string = dayjs().format("YYYYMMDDHHmmssSSS");  // Unique timestamp as a string

    const message: Message = {
      messageType: "text", // Change based on the type (e.g., "image" or "file")
      content: newMessage,
      sender: "serviceProvider",
      timestamp: timeString,
    };

    socket.emit("send_message", {
      senderId: serviceProviderId,
      receiverId: userid,
      message: message,
      messageId: messageId,
    });

    setMessages((prev) => [
      ...prev,
      { ...message, status: "sent", timestamp: timeString },
    ]);
    setNewMessage("");

    // Simulate message delivery after a short delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.timestamp === messageId ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    // Simulate message read after a longer delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.timestamp === messageId ? { ...msg, status: "read" } : msg
        )
      );
    }, 2000);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Message status indicator component
  const MessageStatus = ({ status }: { status?: MessageStatus }) => {
    if (!status) return null;

    if (status === "sent") {
      return <Check size={14} className="text-base-content/70" />;
    } else if (status === "delivered") {
      return (
        <div className="relative">
          <Check size={14} className="absolute text-base-content/70" />
          <Check size={14} className="ml-1 text-base-content/70" />
        </div>
      );
    } else if (status === "read") {
      return (
        <div className="relative">
          <Check size={14} className="absolute text-primary" />
          <Check size={14} className="ml-1 text-primary" />
        </div>
      );
    }

    return null;
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!serviceProviderId || !userid) return null;

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="flex flex-col h-[90vh] rounded-xl shadow-lg overflow-hidden border border-base-300">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b ">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="avatar online">
                <div className="w-12 text-base rounded-full ring ring-primary ">
                  <img src={providerAvatar} alt={providerName} />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold">{providerName}</h3>
              <p className="text-xs opacity-90">{providerStatus}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="btn btn-circle btn-ghost text-primary-content hover:bg-primary-focus btn-sm">
              <Video size={18} />
            </button>
            <button className="btn btn-circle btn-ghost text-primary-content hover:bg-primary-focus btn-sm">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages list */}
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
                <div key={msg.timestamp} className={`chat ${msg.sender === "serviceProvider" ? "chat-end" : "chat-start"}`}>
                  {msg.sender !== "serviceProvider" && (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={providerAvatar} alt="avatar" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`chat-bubble ${
                      msg.sender === "serviceProvider"
                        ? "chat-bubble-primary shadow-md"
                        : "bg-base-100 shadow-md border border-base-300"
                    } ${msg.sender !== "serviceProvider" ? "text-base-content" : ""}`}
                  >
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-1 text-xs chat-footer opacity-70">
                    {dayjs(msg.timestamp).format("hh:mm A")} {/* Format timestamp using Day.js */}
                    {msg.sender === "serviceProvider" && (
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

        {/* Input section with buttons on right */}
        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="relative flex items-center w-full">
            <button className="absolute left-4 btn btn-circle btn-ghost opacity-70 hover:opacity-100">
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
              <button
                className="btn btn-circle btn-ghost opacity-70 hover:opacity-100"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                <Smile size={22} />
              </button>

              <button
                className={`btn btn-circle ${newMessage.trim() ? "btn-primary" : "btn-ghost opacity-50"}`}
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Emoji Picker */}
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

export default ChatServiceProvider;
