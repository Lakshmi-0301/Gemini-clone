import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import ReactMarkdown from 'react-markdown';

const Main = () => {
  const { sendPrompt, response, loading } = useContext(Context); 
  const [input, setInput] = useState(''); 
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSend = () => {
    if (input.trim()) {
      sendPrompt(input);
      setHasSearched(true);
      setInput('');
    }
  };

  return (
    <div className={'main'}>
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
            <div className="card">
              <p>Suggest top places to visit in summer</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>Summarize this concept : Parallel Computing</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>Summer retreat activities</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Improve the readability of this code</p>
              <img src={assets.code_icon} alt="" />
            </div>   
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
            <div onClick={input.trim() && !loading ? handleSend : null}
              style={{ cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', opacity: input.trim() && !loading ? 1 : 0.5 }}>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="send" />
            </div>
          </div>
 

          <p className='bottom-info'>
            Google Terms and the Google Privacy Policy apply. Gemini can make mistakes, so double-check it.
          </p>
        </div>

        
    {loading && (
      <div className="response-box">
      <p><strong>Gemini:</strong> Thinking...</p>
    </div>
    )}
    {!loading && response && (
      <div className="response-box">
      <p><strong>Gemini:</strong> <ReactMarkdown>{response}</ReactMarkdown></p>
    </div>
    )}

    </div>
  </div>
  )
}

export default Main
