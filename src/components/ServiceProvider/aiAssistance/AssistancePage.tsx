import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssistanceSidebar from './AssistanceSidebar';
import AssistanceWindow from './AssistanceWindow';
import { IChatSession, Message } from '../../../utils/types/IAiassistance';
import { getRequest, postRequest } from '../../../utils/makeRequestInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export default function AssistancePage() {
  const { chatId } = useParams();
  const [allChats, setAllChats] = useState<IChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<IChatSession | null>(null);
  const [isloading, setLoading] = useState(false);
  const serviceProviderId = useSelector((state: RootState) => state.serviceProvider._id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!serviceProviderId) return;

    getRequest(`/service-providers/ai-assistance/providers/${serviceProviderId}/chats`).then(res => {
      if (res.status === 200) {
        setAllChats(res.data);
      }
    });
  }, [serviceProviderId]);

  useEffect(() => {
    if (chatId && chatId != 'undefined') {
      const found = allChats.find(c => c._id === chatId);
      if (found) {
        setActiveChat(found);
      } else {
        getRequest('/service-providers/ai-assistance/chats/' + chatId).then(res => {
          if (res.status == 200) {
            console.log(res);
            setActiveChat(res.data);
          }
        });
      }
    }
  }, [chatId]);

  const handleNewChat = () => {
    const newChat: IChatSession = {
      _id: Date.now() + '',
      title: 'New Chat',
      messages: [],
    };
    navigate(`/service-provider/assistance/${newChat._id}`);

    setActiveChat(newChat);
    setAllChats(prev => [newChat, ...prev]);
  };

  const handleSend = async (text: string) => {
    if (!activeChat) return;
    setLoading(true);
    const newMsg: Message = {
      _id: Date.now() + '',
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };

    const updatedChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMsg],
    };

    setAllChats(prev => prev.map(c => (c._id === activeChat._id ? updatedChat : c)));
    setActiveChat(updatedChat);

    console.log(activeChat._id);
    console.log(activeChat._id);

    const res = await postRequest(`/service-providers/ai-assistance/chats/`, {
      message: text,
      ...(chatId != 'undefined' && chatId ? { activeChatId: chatId } : {}),
    });
    if (res.status == 200) {
      console.log(res.data);
      const updatedWithReply = {
        ...updatedChat,
        messages: [...updatedChat.messages, res.data],
      };
      setLoading(false);
      if (res.data.id) {
      }

      setAllChats(prev => prev.map(c => (c._id === activeChat._id ? updatedWithReply : c)));
      setActiveChat(updatedWithReply);

      setActiveChat(updatedWithReply);

      navigate(`/service-provider/assistance/${res.data.id}`);
    }
  };

  console.log(activeChat);

  return (
    <div className="overflow-hidden">
      <div className="flex h-[90vh] overflow-hidden bg-gradient-to-br from-primary/20 via-base-300 to-primary/20 ">
        <AssistanceSidebar chats={allChats} onNewChat={handleNewChat} activeChat={activeChat} />

        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {activeChat ? (
            <AssistanceWindow messages={activeChat.messages} newMessageLoading={isloading} onSend={handleSend} />
          ) : (
            <div className="flex items-center justify-center flex-1 ">
              <h1 className="text-xl ">Select or create a chat to get started </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
