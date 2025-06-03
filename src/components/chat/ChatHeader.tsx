
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelSelector } from './ModelSelector';
import { SearchModal } from '@/components/search/SearchModal';

interface ChatHeaderProps {
  isNewChat: boolean;
  chatTitle?: string;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
  selectedModel: string;
  setSelectedModel: (modelId: string) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isNewChat,
  chatTitle,
  advancedMode,
  setAdvancedMode,
  selectedModel,
  setSelectedModel
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {isNewChat ? 'New Chat' : chatTitle || 'Chat'}
          </h1>
        </div>
        
        {/* Model Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Model:</span>
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            className="min-w-[200px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SearchModal />
        
        {setAdvancedMode && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAdvancedMode?.(!advancedMode)}
            className={cn(
              "h-8 px-3",
              advancedMode && "bg-gray-100 dark:bg-gray-800"
            )}
          >
            <Settings className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Advanced</span>
          </Button>
        )}
      </div>
    </div>
  );
};
