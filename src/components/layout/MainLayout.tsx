import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, ChatItem } from '@/components/layout/sidebar/Sidebar';

type MainLayoutProps = {
  chatItems?: ChatItem[];
  onNewChat?: () => void;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ chatItems = [], onNewChat, advancedMode, setAdvancedMode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-white dark:bg-gray-950">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        chatItems={chatItems}
        onNewChat={onNewChat}
        advancedMode={advancedMode}
        setAdvancedMode={setAdvancedMode}
      />
      <main className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-[60px]' : 'ml-[260px] md:ml-[300px]'
      }`}>
        <Outlet />
      </main>
    </div>
  );
};
