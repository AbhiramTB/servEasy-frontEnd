import { useState } from "react";
import { Send } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", from: "bot" },
    { id: 2, text: "Hey! Why not reply?", from: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, from: "user" }]);
    setNewMessage("");
  };

  return (
    <div className="container">
    <div className="flex flex-col justify-between p-4 mx-auto shadow-lg rounded-xl bg-base-100">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.from === "user" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="avatar"
                  src={
                    msg.from === "user"
                      ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          className="w-full input input-bordered"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
