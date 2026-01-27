import { Check } from "lucide-react";
import React from "react";

type IMessageStatus = "sent" | "delivered" | "read"; 

interface MessageStatusProps {
  status?: IMessageStatus;
}

const MessageStatus: React.FC<MessageStatusProps> = ({ status }) => {
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

export default MessageStatus;
