import AssistanceBubble from "./AssistanceBubble";
import AssistanceInput from "./AssistanceInput";
import { Message } from "../../../utils/types/IAiassistance"; 

interface Props {
  messages: Message[];
  onSend: (text: string) => void;
  newMessageLoading:boolean
}

export default function AssistanceWindow({ messages, onSend,newMessageLoading }: Props) {
  return (
    <div className="flex flex-col flex-1 h-5 p-4 ">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m) => (
          <AssistanceBubble key={m._id}   message={m}  />
        ))}

        {newMessageLoading&& <>
            
            <span className="justify-start bg-red-800 loading loading-ring loading-xl "></span>
          </>}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <AssistanceInput onSend={onSend} />
      </div>
    </div>
  );
}
