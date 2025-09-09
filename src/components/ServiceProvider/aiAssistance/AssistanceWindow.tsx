import AssistanceBubble from "./AssistanceBubble";
import AssistanceInput from "./AssistanceInput";
import { Message } from "../../../utils/types/IAiassistance"; 

interface Props {
  messages: Message[];
  onSend: (text: string) => void;
}

export default function AssistanceWindow({ messages, onSend }: Props) {
  return (
    <div className="flex flex-col flex-1 h-full p-4 ">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m) => (
          <AssistanceBubble key={m.id} message={m} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <AssistanceInput onSend={onSend} />
      </div>
    </div>
  );
}
