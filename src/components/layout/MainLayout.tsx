
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, ChatItem } from '@/components/layout/sidebar/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type MainLayoutProps = {
  chatItems?: ChatItem[];
  onNewChat?: () => void;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  chatItems = [], 
  onNewChat, 
  advancedMode, 
  setAdvancedMode 
}) => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);
  
  // Update sidebar state when mobile state changes
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        chatItems={chatItems}
        onNewChat={onNewChat}
        advancedMode={advancedMode}
        setAdvancedMode={setAdvancedMode}
      />
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out overflow-hidden bg-white dark:bg-gray-900",
        sidebarCollapsed ? "ml-[60px]" : "ml-[260px] md:ml-[300px]"
      )}>
        <Outlet />
      </main>
    </div>
  );
};
