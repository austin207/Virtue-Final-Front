
import React, { useRef, useEffect } from 'react';
import { ChatMessage, MessageType } from '@/components/chat/ChatMessage';
import { fadeIn } from '@/utils/animationUtils';

interface ChatContainerProps {
  messages: MessageType[];
  isNewChat: boolean;
  isLoading: boolean;
  onRegenerateResponse: () => void;
  advancedMode?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ 
  messages, 
  isNewChat, 
  isLoading, 
  onRegenerateResponse,
  advancedMode = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Calculate centered layout class
  const containerLayoutClass = advancedMode 
    ? 'ml-0 mr-[260px]' 
    : 'ml-0 mr-0';

  return (
    <div className={`flex-1 overflow-y-auto flex flex-col transition-all duration-300 ${containerLayoutClass}`}>
      {isNewChat ? (
        <div className="flex-1 bg-white dark:bg-[#2A2B32] flex items-center justify-center">
          <h2 className={`text-2xl font-light text-gray-600 dark:text-gray-300 ${fadeIn()}`}>
            What can I help with?
          </h2>
        </div>
      ) : (
        <div className="flex-1">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message}
              animationDelay={index}
              onRegenerateResponse={message.role === 'assistant' ? onRegenerateResponse : undefined}
            />
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />
      
      {/* Loading indicator with enhanced animations */}
      {isLoading && (
        <div className="py-8 px-4 md:px-6 bg-chat-light dark:bg-chat-dark">
          <div className="max-w-4xl mx-auto flex gap-4">
            <div className="flex-shrink-0 pt-1">
              <div className="h-8 w-8 rounded-full bg-ai-primary flex items-center justify-center">
                <img 
                  src="/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png" 
                  alt="AI" 
                  className="h-6 w-6 animate-pulse transition-opacity" 
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-md animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
