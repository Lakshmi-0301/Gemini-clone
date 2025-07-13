import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
import ReactMarkdown from 'react-markdown';

const Main = ({ collapsed }) => {  // ✅ Accept collapsed as prop
  const { sendPrompt, response, loading } = useContext(Context);
  const [input, setInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { chats, activeChatId } = useContext(Context);

  const activeChat = chats.find(c => c.id === activeChatId);

  const suggestions = [
    {
      text: 'Suggest top places to visit in summer',
      icon: assets.compass_icon,
    },
    {
      text: 'Summarize this concept : Parallel Computing',
      icon: assets.bulb_icon,
    },
    {
      text: 'Summer retreat activities',
      icon: assets.message_icon,
    },
    {
      text: 'Improve the readability of this code',
      icon: assets.code_icon,
    },
  ];

  const handleSend = () => {
    if (input.trim()) {
      sendPrompt(input);
      setHasSearched(true);
      setInput('');
    }
  };

  const handleCardClick = (prompt) => {
    sendPrompt(prompt);
    setHasSearched(true);
  };

  return (
    <div className={`main ${collapsed ? 'collapsed' : ''}`}> {/* ✅ Adjust main margin */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user icon" />
      </div>

      <div className="main-container">
        {!hasSearched && (
          <>
            <div className="greet">
              <p>
                <span style={{
                  background: 'linear-gradient(90deg, #5d5fef, #c14b67)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Meet Gemini, your personal AI assistant
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {suggestions.map((item, index) => (
                <div className="card" key={index} onClick={() => handleCardClick(item.text)}>
                  <p>{item.text}</p>
                  <img src={item.icon} alt="icon" />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Ask Gemini'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <div
              onClick={input.trim() && !loading ? handleSend : null}
              style={{
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                opacity: input.trim() && !loading ? 1 : 0.5
              }}
            >
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="send" />
            </div>
          </div>

          <p className='bottom-info'>
            Google Terms and the Google Privacy Policy apply. Gemini can make mistakes, so double-check it.
          </p>
        </div>

        {activeChat?.messages.map((msg, index) => (
          <div className="response-box" key={index}>
            <p><strong>{msg.role === 'user' ? 'You' : 'Gemini'}:</strong> <ReactMarkdown>{msg.text}</ReactMarkdown></p>
          </div>
        ))}

        {loading && (
          <div className="response-box">
            <p><strong>Gemini:</strong> Thinking...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
