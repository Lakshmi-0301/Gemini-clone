import { createContext, useState } from 'react';
import { fetchGeminiResponse } from '../config/gemini';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([
  { id: 1, messages: [], timestamp: new Date() }
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  // const sendPrompt = async (userPrompt) => {
  //   setLoading(true);
  //   try {
  //     const reply = await fetchGeminiResponse(userPrompt);
  //     setResponse(reply);
  //   } catch (err) {
  //     console.error(err);
  //     setResponse('Error getting response.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
    const createNewChat = () => {
    const newId = Date.now(); 
    const newChat = {
      id: newId,
      messages: [],
      timestamp: new Date()
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newId);
  };

  const sendPrompt = async (userPrompt) => {
  setLoading(true);
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
