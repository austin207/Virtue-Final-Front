
import React from 'react';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatItem } from '@/components/layout/sidebar/types';
import { useChatState } from '@/hooks/useChatState';
import { useChatActions } from '@/hooks/useChatActions';
import { AdvancedSettings } from '@/components/chat/AdvancedSettings';

interface ChatPageProps {
  updateChatHistory?: (chatItem: ChatItem) => void;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ 
  updateChatHistory,
  advancedMode = false,
  setAdvancedMode
}) => {
  const {
    chatId,
    messages,
    setMessages,
    isNewChat,
    isLoading,
    setIsLoading,
    currentChat,
    temperature,
    setTemperature,
    length,
    setLength,
    tokensPerSecond,
    setTokensPerSecond,
    navigate,
    toast
  } = useChatState(updateChatHistory);
  
  const {
    handleRegenerateResponse,
    handleSendMessage
  } = useChatActions({
    chatId,
    isNewChat,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    setTokensPerSecond,
    navigate,
    toast,
    updateChatHistory,
    temperature,
    length
  });

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader 
        isNewChat={isNewChat}
        chatTitle={currentChat?.title}
        advancedMode={advancedMode}
        setAdvancedMode={setAdvancedMode}
      />

      <ChatContainer 
        messages={messages}
        isNewChat={isNewChat}
        isLoading={isLoading}
        onRegenerateResponse={handleRegenerateResponse}
      />

      <div className="border-t border-gray-200 dark:border-gray-500 py-4 mt-auto bg-white dark:bg-chat-darker">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isLoading}
          advancedMode={advancedMode}
          temperature={temperature}
          setTemperature={setTemperature}
          length={length}
          setLength={setLength}
          tokensPerSecond={tokensPerSecond}
        />
      </div>
      
      {advancedMode && (
        <AdvancedSettings
          temperature={temperature}
          setTemperature={setTemperature}
          length={length}
          setLength={setLength}
          tokensPerSecond={tokensPerSecond}
        />
      )}
    </div>
  );
};
