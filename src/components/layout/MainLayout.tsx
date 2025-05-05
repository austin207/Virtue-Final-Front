
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        collapsed ? "ml-[60px]" : "ml-[260px] md:ml-[300px]"
      )}>
        <Outlet />
      </div>
    </div>
  );
};
