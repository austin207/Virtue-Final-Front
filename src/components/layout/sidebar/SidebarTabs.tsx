
import React from 'react';
import { MessageSquare, BookMarked } from 'lucide-react';

type SidebarTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  chatCount: number;
};

export const SidebarTabs = ({ activeTab, setActiveTab, chatCount }: SidebarTabsProps) => {
  return (
    <div style={{
      display: 'flex',
      padding: '12px',
      gap: '4px'
    }}>
      <button 
        onClick={() => setActiveTab("chats")}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          padding: '8px',
          fontSize: '12px',
          fontWeight: '600',
          color: activeTab === "chats" ? '#f9fafb' : '#9ca3af',
          backgroundColor: activeTab === "chats" ? '#374151' : 'transparent',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center'
        }}
        onMouseEnter={(e) => {
          if (activeTab !== "chats") {
            e.currentTarget.style.backgroundColor = '#374151';
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== "chats") {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <MessageSquare style={{
            width: '16px',
            height: '16px',
            marginRight: '8px',
            color: '#9ca3af'
          }} />
          CHATS
        </span>
        <span style={{
          marginLeft: '8px',
          padding: '2px 6px',
          backgroundColor: '#6b7280',
          color: '#f9fafb',
          borderRadius: '4px',
          fontSize: '10px'
        }}>
          {chatCount}
        </span>
      </button>
      
      <button 
        onClick={() => setActiveTab("saved")}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          padding: '8px',
          fontSize: '12px',
          fontWeight: '600',
          color: activeTab === "saved" ? '#f9fafb' : '#9ca3af',
          backgroundColor: activeTab === "saved" ? '#374151' : 'transparent',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center'
        }}
        onMouseEnter={(e) => {
          if (activeTab !== "saved") {
            e.currentTarget.style.backgroundColor = '#374151';
          }
        }}
        onMouseLeave={(e) => {
          if (activeTab !== "saved") {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <BookMarked style={{
            width: '16px',
            height: '16px',
            marginRight: '8px',
            color: '#9ca3af'
          }} />
          SAVED
        </span>
        <span style={{
          marginLeft: '8px',
          padding: '2px 6px',
          backgroundColor: '#6b7280',
          color: '#f9fafb',
          borderRadius: '4px',
          fontSize: '10px'
        }}>
          0
        </span>
      </button>
    </div>
  );
};
