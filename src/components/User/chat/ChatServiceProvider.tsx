import { useEffect, useState, useRef } from "react";
import {
  Send,
  Video,
  MoreVertical,
  Smile,
  Check,
  Paperclip,
  Phone,
} from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  connectSocket,
  getSocket,
  disconnectSocket,
} from "../../../utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getAllchats } from "./getAllchats";
import { getRequest } from "../../../utils/makeRequestInstance";

// Add the relativeTime plugin to format last seen properly
dayjs.extend(relativeTime);

// Types
type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  id: string;
  messageType: string;
  content: string;
  sender: "user" | "serviceProvider";
  timestamp: string | number;
  status?: MessageStatus;
}

interface UserData {
  userAvatar?: string;
  userName: string;
}

const ChatUser = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { userid } = useParams();
  const serviceProvider = useSelector(
    (store: RootState) => store.serviceProvider
  );
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch user data and chat history
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (userid) {
          getProfile(userid);
        }

        const chatRes: any = await getAllchats(
          userid + "",
          serviceProvider.userId + ""
        );

        if (chatRes.status === 200) {
          const chatData = chatRes.data.data.data;
          setMessages(chatData.messages);

          // Handle presence data
          const presence = chatData.presence;
          if (presence && presence.length > 0) {
            const userPresence = presence.find(
              (i: any) => i.userId !== serviceProvider.userId
            );

            if (userPresence) {
              setIsOnline(userPresence.online);
              if (!userPresence.online && userPresence.lastSeen) {
                setLastSeen(userPresence.lastSeen);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userid, serviceProvider.userId]);

  // Socket connection and event handlers
  useEffect(() => {
    if (!serviceProvider.userId || !userid) return;

    const socket = connectSocket();

    socket.emit("join_chat", {
      senderId: serviceProvider.userId,
      serviceProviderId: userid,
    });

    socket.on("user_online", () => {
      setIsOnline(true);
      setLastSeen(null);
      socket.emit("makeItOnline", {
        onlineId: serviceProvider.userId,
        receiverId: userid,
      });
    });

    socket.on("user_offline", (data: { lastSeen: string }) => {
      setIsOnline(false);
      setLastSeen(data.lastSeen);
    });

    socket.on("receive_message", (data: { message: Message }) => {
      const { message } = data;
      setMessages((prev) => [...prev, message]);
    });

    socket.on("message_delivered", ({ messageId }: { messageId: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "delivered" } : msg
        )
      );
    });

    socket.on("message_read", ({ messageId }: { messageId: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "read" } : msg
        )
      );
    });

    return () => {
      socket.emit("leave_chat", {
        senderId: serviceProvider.userId,
        receiverId: userid,
        offlineId: serviceProvider.userId,
      });
      disconnectSocket();
    };
  }, [userid, serviceProvider.userId]);

  // Handle sending messages
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const socket = getSocket();
    const id = Date.now().toString();

    const message: Message = {
      id,
      messageType: "text",
      content: newMessage,
      sender: "serviceProvider",
      timestamp: Date.now(),
      status: "sent",
    };

    socket.emit("send_message", {
      senderId: serviceProvider.userId,
      receiverId: userid,
      message: message,
      senderInfo:{senderName:serviceProvider.serviceProviderName,senderProfile:serviceProvider.profileImage}

    });

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Focus back on input field after sending
    inputRef.current?.focus();

    // Simulate message delivery and read status (for demo purposes)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
      );
    }, 2000);
  };

  const getProfile = async (id: string) => {
    try {

      const res = await getRequest("/user/profile/"+id);
      if (res.status === 200) {
        setUserData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle emoji selection
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format last seen time nicely
  const formatLastSeen = (timestamp: string | null) => {
    if (!timestamp) return "";

    const date = dayjs(timestamp);
    const now = dayjs();

    if (now.diff(date, "day") <= 1) {
      return `Last seen ${date.fromNow()}`;
    } else {
      return `Last seen on ${date.format("DD MMM, hh:mm A")}`;
    }
  };

  // Message status indicator component
  const MessageStatus = ({ status }: { status?: MessageStatus }) => {
    if (!status) return null;

    const checkClass =
      status === "read" ? "text-primary" : "text-base-content/70";

    return (
      <div className="relative">
        <Check size={14} className={`absolute ${checkClass}`} />
        <Check size={14} className={`ml-1 ${checkClass}`} />
      </div>
    );
  };

  // Exit early if not authenticated
  if (!serviceProvider.userId) return null;
 
 const navigate=useNavigate()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col h-[90vh] rounded-xl shadow-lg overflow-hidden border border-base-300 bg-base-100">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-base-200">
          <div className="flex items-center space-x-4">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={
                    userData?.userAvatar ||
                    import.meta.env.VITE_IMAGE_PLACEHOLDER
                  }
                  alt={userData?.userName || "User"}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                {userData?.userName || "User"}
              </h3>
              {isOnline ? (
                <p className="text-xs text-success">Online</p>
              ) : (
                <p className="text-xs opacity-70">{formatLastSeen(lastSeen)}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            {/* <button className="btn btn-circle btn-ghost">
              <Phone size={18} />
            </button> */}
            
            <button onClick={()=>navigate(`/service-provider/video-call/${userid}`)} className="btn btn-circle btn-ghost">
              <Video size={18} />
            </button>
            {/* <button className="btn btn-circle btn-ghost">
              <MoreVertical size={18} />
            </button> */}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-base-200/50 to-base-100">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-base-content/70">
              <div className="max-w-xs p-6 text-center border shadow-md card bg-base-100 border-base-300">
                <h3 className="mb-2 text-lg font-medium">
                  Start your conversation
                </h3>
                <p className="text-sm">
                  Send a message to begin chatting with{" "}
                  {userData?.userName || "User"}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat ${
                    msg.sender === "serviceProvider" ? "chat-end" : "chat-start"
                  }`}
                >
                  {msg.sender === "user" && (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            userData?.userAvatar ||
                            import.meta.env.VITE_IMAGE_PLACEHOLDER
                          }
                          alt={userData?.userName || "User"}
                        />
                      </div>
                    </div>
                  )}

                  <div
                    className={`chat-bubble ${
                      msg.sender === "serviceProvider"
                        ? "chat-bubble-primary text-primary-content"
                        : "bg-base-200 text-base-content"
                    } shadow-sm`}
                  >
                    {msg.content}
                  </div>

                  <div className="flex items-center gap-1 text-xs chat-footer opacity-70">
                    {dayjs(msg.timestamp).format("hh:mm A")}

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
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <div className="absolute flex items-center space-x-2 right-4">
              <button
                className="btn btn-circle btn-ghost btn-sm"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                <Smile size={20} />
              </button>

              <button
                className={`btn btn-circle btn-sm ${
                  newMessage.trim()
                    ? "btn-primary text-primary-content"
                    : "btn-ghost opacity-50"
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
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                height={350}
                width={320}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
