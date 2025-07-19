import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const {
    createNewChat,
    chats,
    activeChatId,
    setActiveChatId,
  } = useContext(Context);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="top-row">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
          onClick={() => setCollapsed(!collapsed)}
        />
        <div className="new-chat-wrapper">
          <div
            className="new-chat"
            data-tooltip={collapsed ? 'New Chat' : ''}
            onClick={createNewChat}
          >
            <img src={assets.plus_icon} alt="New" />
          </div>
          {!collapsed && <p className="new-chat-label">New Chat</p>}
        </div>
      </div>

      {!collapsed && (
        <div className="recent">
          <p className="recent-title">Recent</p>
        </div>
      )}

      {/* ✅ Show only chats with messages */}
      {chats
        .filter(chat => chat.messages.length > 0)
        .map(chat => (
          <div
            key={chat.id}
            className={`recent-entry ${chat.id === activeChatId ? 'active' : ''}`}
            onClick={() => setActiveChatId(chat.id)}
          >
            <img src={assets.message_icon} />
            <p>{chat.messages[0]?.text.slice(0, 30) || 'New Chat'}</p>
          </div>
        ))}

      <div className="bottom">
        <div
          className="bottom-item recent-entry"
          data-tooltip={collapsed ? 'Help' : ''}
          onClick={() => window.open('https://support.google.com/gemini', '_blank')}
          style={{ cursor: 'pointer' }}
        >
          <img src={assets.question_icon} alt="Help" />
          {!collapsed && <p>Help</p>}
        </div>

        <div
          className="bottom-item recent-entry"
          data-tooltip={collapsed ? 'History' : ''}
        >
          <img src={assets.history_icon} alt="History" />
          {!collapsed && <p>History</p>}
        </div>
        <div
          className="bottom-item recent-entry"
          data-tooltip={collapsed ? 'Settings' : ''}
        >
          <img src={assets.setting_icon} alt="Settings" />
          {!collapsed && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
