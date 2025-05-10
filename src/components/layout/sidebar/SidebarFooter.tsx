
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Avatar } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

type SidebarFooterProps = {
  collapsed: boolean;
  theme: string;
  setTheme: (theme: string) => void;
};

export const SidebarFooter = ({ collapsed, theme, setTheme }: SidebarFooterProps) => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="p-3 border-t border-gray-200 dark:border-gray-500">
      {collapsed ? (
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-8 w-8 cursor-pointer" onClick={handleNavigateToProfile}>
            <img src="/lovable-uploads/user.png" alt="User" />
          </Avatar>
          <Toggle
            size="sm"
            pressed={theme === "dark"}
            onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Toggle>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleNavigateToProfile}>
            <Avatar className="h-8 w-8">
              <img src="/lovable-uploads/user.png" alt="User" />
            </Avatar>
            <div>
              <div className="flex items-center">
                <span className="text-sm font-medium">You</span>
                <span className="ml-1 px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded text-xs">PRO</span>
              </div>
            </div>
          </div>
          <Toggle
            size="sm"
            pressed={theme === "dark"}
            onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Toggle>
        </div>
      )}
    </div>
  );
};
