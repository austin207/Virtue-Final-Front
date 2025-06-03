
import React, { useEffect, useCallback } from 'react';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatItem } from '@/components/layout/sidebar/types';
import { useChatState } from '@/hooks/useChatState';
import { useChatActions } from '@/hooks/useChatActions';
import { AdvancedSettings } from '@/components/chat/AdvancedSettings';
import { TrainModelSection } from '@/components/chat/TrainModelSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { debounce } from '@/lib/utils';

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
  const isMobile = useIsMobile();
  
  // Auto-disable advanced mode on mobile
  useEffect(() => {
    if (isMobile && advancedMode && setAdvancedMode) {
      setAdvancedMode(false);
    }
  }, [isMobile, advancedMode, setAdvancedMode]);
  
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
    top_K,
    setTopK,
    top_P,
    setTopP,
    repetition_penalty,
    setRepetitionPenalty,
    selectedModel,
    setSelectedModel,
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
    length,
    top_K,
    top_P,
    repetition_penalty,
    selectedModel
  });
  
  // Debounced window resize handler for performance
  const handleResize = useCallback(debounce(() => {
    window.dispatchEvent(new Event('resize'));
  }, 250), []);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    
    // Update relevant model parameters based on selected model
    if (modelId === 'virtue-v1') {
      setTopK(40);
      setTopP(0.9);
      setRepetitionPenalty(1.1);
    } else if (modelId === 'llama-transformer') {
      setTopK(50);
      setTopP(0.95);
      setRepetitionPenalty(1.0);
    } else {
      setTopK(0);
      setTopP(0.8);
      setRepetitionPenalty(1.2);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <ChatHeader 
        isNewChat={isNewChat}
        chatTitle={currentChat?.title}
        advancedMode={advancedMode}
        setAdvancedMode={setAdvancedMode}
        selectedModel={selectedModel}
        setSelectedModel={handleModelChange}
      />

      <ChatContainer 
        messages={messages}
        isNewChat={isNewChat}
        isLoading={isLoading}
        onRegenerateResponse={handleRegenerateResponse}
        advancedMode={advancedMode}
      />

      <div className={`border-t border-gray-200 dark:border-gray-500 py-2 md:py-4 mt-auto bg-white dark:bg-chat-darker transition-all duration-300 ${!isMobile && advancedMode ? 'pr-[260px]' : ''}`}>
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
      
      {/* Train Model Section */}
      <TrainModelSection />
      
      {!isMobile && advancedMode && (
        <AdvancedSettings
          temperature={temperature}
          setTemperature={setTemperature}
          length={length}
          setLength={setLength}
          top_K={top_K}
          setTopK={setTopK}
          top_P={top_P}
          setTopP={setTopP}
          repetition_penalty={repetition_penalty}
          setRepetitionPenalty={setRepetitionPenalty}
          tokensPerSecond={tokensPerSecond}
        />
      )}
    </div>
  );
};
