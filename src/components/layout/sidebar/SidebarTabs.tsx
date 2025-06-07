
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookMarked } from 'lucide-react';

type SidebarTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  chatCount: number;
};

export const SidebarTabs = ({ activeTab, setActiveTab, chatCount }: SidebarTabsProps) => {
  return (
    <div className="flex p-3 space-x-1">
      <Button 
        variant={activeTab === "chats" ? "secondary" : "ghost"} 
        size="sm"
        className="flex-1 justify-start px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
        onClick={() => setActiveTab("chats")}
      >
        <span className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
          CHATS
        </span>
        <span className="ml-2 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
          {chatCount}
        </span>
      </Button>
      <Button 
        variant={activeTab === "saved" ? "secondary" : "ghost"} 
        size="sm"
        className="flex-1 justify-start px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
        onClick={() => setActiveTab("saved")}
      >
        <span className="flex items-center">
          <BookMarked className="h-4 w-4 mr-2 text-gray-500" />
          SAVED
        </span>
        <span className="ml-2 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">0</span>
      </Button>
    </div>
  );
};
