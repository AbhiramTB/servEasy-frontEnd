export interface Message {
  _id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface IChatSession {
  _id?: string;
  title: string;
  messages: Message[];
}
