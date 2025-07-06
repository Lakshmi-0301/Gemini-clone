import { createContext, useState } from 'react';
import { fetchGeminiResponse } from '../config/gemini';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async (userPrompt) => {
    setLoading(true);
    try {
      const reply = await fetchGeminiResponse(userPrompt);
      setResponse(reply);
    } catch (err) {
      console.error(err);
      setResponse('Error getting response.');
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
