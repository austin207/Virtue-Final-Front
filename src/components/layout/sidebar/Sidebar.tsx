
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/ThemeProvider';
import { SidebarHeader } from './SidebarHeader';
import { SidebarTabs } from './SidebarTabs';
import { SidebarSearch } from './SidebarSearch';
import { SidebarNavigation } from './SidebarNavigation';
import { ChatList } from './ChatList';
import { SidebarFooter } from './SidebarFooter';
import { SidebarProps, ChatItem } from './types';
import { getNavItems, getDefaultChatItem } from './navConfig';
import './sidebar.css';

export { type ChatItem } from './types';

export const Sidebar = ({ collapsed, setCollapsed, chatItems = [], onNewChat }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("chats");

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      navigate('/chat/new');
    }
  };

  const navItems = getNavItems();

  // Use either the provided chat items or just the new chat option if empty
  const defaultChatItems = [getDefaultChatItem(location.pathname === "/chat/new")];
  const displayChatItems = chatItems.length > 0 ? chatItems : defaultChatItems;

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-20 h-full chat-sidebar border-r-4 border-gray-200 dark:border-gray-500 transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[260px] md:w-[300px]"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <SidebarHeader 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          onNewChat={handleNewChat} 
        />

        {/* Sidebar Tabs */}
        {!collapsed && (
          <SidebarTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            chatCount={chatItems.length}
          />
        )}

        {/* Search Bar */}
        {!collapsed && <SidebarSearch />}

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {collapsed ? (
            <SidebarNavigation navItems={navItems} />
          ) : (
            <ChatList chatItems={displayChatItems} />
          )}
        </div>

        {/* Footer */}
        <SidebarFooter 
          collapsed={collapsed} 
          theme={theme} 
          setTheme={setTheme} 
        />
      </div>
    </div>
  );
};
