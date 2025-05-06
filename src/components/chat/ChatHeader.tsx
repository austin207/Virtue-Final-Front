
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  isNewChat: boolean;
  chatTitle?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isNewChat, chatTitle }) => {
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

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-chat-darker">
      <h1 className="font-semibold">
        {isNewChat ? 'New Chat' : (chatTitle || 'Chat')}
      </h1>
      <div className="flex items-center space-x-2">
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
