
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Settings } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';

type SidebarHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onNewChat?: () => void;
  advancedMode?: boolean;
  setAdvancedMode?: (advanced: boolean) => void;
};

export const SidebarHeader = ({ 
  collapsed, 
  setCollapsed, 
  onNewChat, 
  advancedMode = false,
  setAdvancedMode
}: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-500">
      {!collapsed && (
        <div className="flex items-center">
          <img src="/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png" alt="Logo" className="h-9 w-9 mr-2" />
          <h1 className="text-lg font-semibold">My Chats</h1>
        </div>
      )}

      {collapsed ? (
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 p-0 ml-auto"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      ) : (
        <div className="flex items-center space-x-2">
          <Button 
           variant="outline" 
           size="icon" 
           className="w-8 h-8 p-0 border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
           onClick={onNewChat}
           aria-label="New Chat"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                <span className="text-lg">⋯</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="end">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Advanced Mode</span>
                  <Toggle
                    aria-label="Toggle advanced mode"
                    pressed={advancedMode}
                    onPressedChange={(pressed) => setAdvancedMode && setAdvancedMode(pressed)}
                  >
                    <Settings className="h-4 w-4" />
                  </Toggle>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 p-0"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
