import { useState } from "react";

interface Props {
  onSend: (text: string) => void;
}

export default function AssistanceInput({ onSend }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(input);
    setInput("");
  };

   return (
    <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 w-full input input-bordered"
      />
      <button type="submit" className="btn btn-primary shrink-0">
        Send
      </button>
    </form>
  );
}
