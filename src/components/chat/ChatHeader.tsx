
import React from 'react';
import { Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Toggle } from '@/components/ui/toggle';

interface ChatHeaderProps {
  isNewChat: boolean;
  chatTitle?: string;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isNewChat, 
  chatTitle,
  advancedMode = false,
  setAdvancedMode
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartNewChat = () => {
    navigate('/chat/new');
    toast({
      title: 'New chat started',
      description: 'Ask me anything!',
    });
  };

  const handleSearch = () => {
    toast({
      title: 'Search',
      description: 'Search functionality would open here',
    });
  };

  const toggleAdvancedMode = () => {
    if (setAdvancedMode) {
      const newMode = !advancedMode;
      setAdvancedMode(newMode);
      toast({
        title: newMode ? 'Advanced Mode Enabled' : 'Normal Mode Enabled',
        description: newMode ? 'You can now adjust temperature and length parameters.' : 'Switched back to normal mode.',
      });
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-chat-darker">
      <h1 className="font-semibold">
        {isNewChat ? 'New Chat' : (chatTitle || 'Chat')}
      </h1>
      <div className="flex items-center space-x-2">
        {setAdvancedMode && (
          <Toggle
            pressed={advancedMode}
            onPressedChange={toggleAdvancedMode}
            aria-label="Toggle advanced mode"
            className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="w-5 h-5" />
          </Toggle>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleStartNewChat}
        >
          <span className="text-lg">⋯</span>
        </Button>
      </div>
    </header>
  );
};
