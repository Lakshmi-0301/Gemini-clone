import { createContext, useState } from 'react';
import { fetchGeminiResponse } from '../config/gemini';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const createNewChat = () => {
    const newId = Date.now();
    setActiveChatId(newId);
    // Do NOT push to chats[] here
  };

  const sendPrompt = async (userPrompt) => {
    setLoading(true);

    const chatExists = chats.some(chat => chat.id === activeChatId);
    if (!chatExists) {
      const newChat = {
        id: activeChatId,
        messages: [],
        timestamp: new Date()
      };
      setChats(prev => [newChat, ...prev]);
    }

    try {
      const geminiReply = await fetchGeminiResponse(userPrompt);
      setChats(prev =>
        prev.map(chat =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: 'user', text: userPrompt },
                  { role: 'gemini', text: geminiReply }
                ]
              }
            : chat
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider
      value={{
        prompt,
        setPrompt,
        response,
        loading,
        sendPrompt,
        chats,
        activeChatId,
        setActiveChatId,
        createNewChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
