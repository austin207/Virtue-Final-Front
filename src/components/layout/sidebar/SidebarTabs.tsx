
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookMarked } from 'lucide-react';

type SidebarTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  chatCount: number;
};

export const SidebarTabs = ({ activeTab, setActiveTab, chatCount }: SidebarTabsProps) => {
  const containerStyle = {
    display: 'flex',
    padding: '12px',
    gap: '4px'
  };

  const buttonBaseStyle = {
    flex: 1,
    justifyContent: 'flex-start',
    padding: '8px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#9ca3af',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center'
  };

  const buttonActiveStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#374151',
    color: '#f9fafb'
  };

  const buttonHoverStyle = {
    backgroundColor: '#374151'
  };

  const badgeStyle = {
    marginLeft: '8px',
    padding: '2px 6px',
    backgroundColor: '#6b7280',
    color: '#f9fafb',
    borderRadius: '4px',
    fontSize: '10px'
  };

  const iconStyle = {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    color: '#9ca3af'
  };

  return (
    <div style={containerStyle}>
      <button 
        style={activeTab === "chats" ? buttonActiveStyle : buttonBaseStyle}
        onClick={() => setActiveTab("chats")}
        onMouseEnter={(e) => {
          if (activeTab !== "chats") {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== "chats") {
            Object.assign(e.currentTarget.style, buttonBaseStyle);
          }
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <MessageSquare style={iconStyle} />
          CHATS
        </span>
        <span style={badgeStyle}>
          {chatCount}
        </span>
      </button>
      <button 
        style={activeTab === "saved" ? buttonActiveStyle : buttonBaseStyle}
        onClick={() => setActiveTab("saved")}
        onMouseEnter={(e) => {
          if (activeTab !== "saved") {
            Object.assign(e.currentTarget.style, buttonHoverStyle);
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== "saved") {
            Object.assign(e.currentTarget.style, buttonBaseStyle);
          }
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <BookMarked style={iconStyle} />
          SAVED
        </span>
        <span style={badgeStyle}>0</span>
      </button>
    </div>
  );
};
