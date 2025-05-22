
import React, { useState, useEffect } from 'react';
import { Search, UserCog, Plus, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Toggle } from '@/components/ui/toggle';
import { ModelSelector } from './ModelSelector';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  isNewChat: boolean;
  chatTitle?: string;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
  selectedModel?: string;
  setSelectedModel?: (model: string) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isNewChat, 
  chatTitle,
  advancedMode = false,
  setAdvancedMode,
  selectedModel: externalSelectedModel,
  setSelectedModel: externalSetSelectedModel
}) => {
  // Local state as fallback if props aren't provided
  const [localSelectedModel, setLocalSelectedModel] = useState('virtue-v2');
  
  // Determine if we're using external or local state
  const selectedModel = externalSelectedModel || localSelectedModel;
  const setSelectedModel = externalSetSelectedModel || setLocalSelectedModel;
  
  // Save selected model to localStorage
  useEffect(() => {
    if (!externalSetSelectedModel) { // Only save if using local state
      localStorage.setItem('selectedModel', localSelectedModel);
    }
  }, [localSelectedModel, externalSetSelectedModel]);
  
  // Load selected model from localStorage on mount
  useEffect(() => {
    if (!externalSetSelectedModel) { // Only load if using local state
      const savedModel = localStorage.getItem('selectedModel');
      if (savedModel) {
        setLocalSelectedModel(savedModel);
      }
    }
  }, [externalSetSelectedModel]);
  
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    toast({
      title: 'Model Changed',
      description: `Switched to ${modelId === 'virtue-v1' ? 'Virtue-V1 (RNN)' : 'Virtue-V2 (Transformer)'}`
    });
  };
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
    navigate('/browse');
    toast({
      title: 'Search',
      description: 'Search the web for information',
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

  const handleNavigateToProfile = () => {
    navigate('/profile');
    toast({
      title: 'Profile',
      description: 'View and edit your profile settings',
    });
  };

  const handleShareChat = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Chat Link Copied",
      description: "The link to this chat has been copied to your clipboard.",
    });
  };

  const handleExportChat = () => {
    // In a real app, this would export the current chat to a file
    toast({
      title: "Chat Exported",
      description: "Your chat has been exported successfully.",
    });
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-chat-darker">
      <div className="flex items-center space-x-3">
        <h1 className="font-semibold">
          {isNewChat ? 'New Chat' : (chatTitle || 'Chat')}
        </h1>
        {/* Model selector - only show for new chats */}
        {isNewChat && (
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
            className="w-40 text-xs"
          />
        )}
      </div>
      <div className="flex items-center space-x-2">
        {setAdvancedMode && (
          <Toggle
            pressed={advancedMode}
            onPressedChange={toggleAdvancedMode}
            aria-label="Toggle advanced mode"
            className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <UserCog className="w-5 h-5" />
          </Toggle>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="text-lg">⋯</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleStartNewChat}>
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleNavigateToProfile}>
              <UserCog className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShareChat}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Chat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportChat}>
              <Download className="mr-2 h-4 w-4" />
              Export Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
