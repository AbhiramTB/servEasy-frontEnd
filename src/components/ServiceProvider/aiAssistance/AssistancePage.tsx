import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AssistanceSidebar from './AssistanceSidebar';
import AssistanceWindow from './AssistanceWindow';
import { IChatSession, Message } from '../../../utils/types/IAiassistance';
import { postRequest } from '../../../utils/makeRequestInstance';

export default function AssistancePage() {
  const { chatId } = useParams();
  const [allChats, setAllChats] = useState<IChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<IChatSession | null>(null);

  // Load chat when switching route
  useEffect(() => {
    if (chatId) {
      const found = allChats.find(c => c.id === chatId);
      if (found) {
        setActiveChat(found);
      } else {
        // Fetch old chat from backend
        // fetch(`/api/assistance/${chatId}`)
        //   .then(res => res.json())
        //   .then(data => {
        //     setChats(prev => [...prev, data]);
        //     setActiveChat(data);
        //   });
      }
    }
  }, [chatId]);

  const handleNewChat = () => {
    const newChat: IChatSession = {
      // id: Date.now() + '',
      title: 'New Chat',
      messages: [],
    };
    setAllChats(prev => [...prev, newChat]);
    setActiveChat(newChat);
    // window.history.pushState({}, '', `/assistance/${newChat.id}`);
  };

  const handleSend = async (text: string) => {
    if (!activeChat) return;

    const newMsg: Message = {
      id: Date.now() + '',
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMsg],
    };

    setAllChats(prev => prev.map(c => (c.id === activeChat.id ? updatedChat : c)));
    setActiveChat(updatedChat);

    const res = await postRequest(`/service-providers/ai-assistance/chats/`, {
      message: text,
      ...(activeChat.id ? {activeChatId:activeChat.id}:{}),
    });
    if (res.status == 200) {
      console.log(res.data);
      const updatedWithReply = {
        ...updatedChat,
        messages: [...updatedChat.messages, res.data],
      };
      setAllChats(prev => prev.map(c => (c.id === activeChat.id ? updatedWithReply : c)));
      setActiveChat(updatedWithReply);
    }
  };

  console.log(activeChat);
  // console.log(activeChat?.messages)
  return (
    <div className="flex h-screen">
      {/* Sidebar should never scroll with chat */}
      <AssistanceSidebar chats={allChats} onNewChat={handleNewChat} />

      {/* Chat Window takes remaining space and scrolls independently */}
      <div className="flex flex-col flex-1 w-full">
        {activeChat ? (
          <AssistanceWindow messages={activeChat.messages} onSend={handleSend} />
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-primary">Select or create a chat</p>
          </div>
        )}
      </div>
    </div>
  );
}
