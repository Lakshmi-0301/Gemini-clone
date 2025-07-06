import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = ({ collapsed, setCollapsed }) => {
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
          <div className="new-chat" data-tooltip={collapsed ? 'New Chat' : ''}>
            <img src={assets.plus_icon} alt="New" />
          </div>
          {!collapsed && <p className="new-chat-label">New Chat</p>}
        </div>
      </div>

      {!collapsed && (
        <div className="recent">
          <p className="recent-title">Recent</p>
          <div className="recent-entry">
            <img src={assets.message_icon} alt="" />
            <p>What is react?</p>
          </div>
        </div>
      )}

      <div className="bottom">
        <div
          className="bottom-item recent-entry"
          data-tooltip={collapsed ? 'Help' : ''}
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
  )
}

export default Sidebar
