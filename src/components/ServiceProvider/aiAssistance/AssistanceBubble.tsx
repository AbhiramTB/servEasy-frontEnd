import { Message } from "../../../utils/types/IAiassistance";

interface Props {
  message: Message;
}

export default function AssistanceBubble({ message }: Props) {
  const isUser = message.role === "user";
  return (
    <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow
          ${isUser ? "bg-primary text-primary-content rounded-br-none" : "bg-base-100 text-base-content rounded-bl-none"}
        `}
      >
        <p className="text-sm">{message.content}</p>
        <span className={`block mt-1 text-[10px] ${isUser?"text-primary-content/55":"text-base-content/55" } `}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
