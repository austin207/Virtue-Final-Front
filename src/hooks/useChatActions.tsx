
import { useState } from 'react';
import { generateText } from '@/services/llmService';
import { ChatItem } from '@/components/layout/sidebar/types';
import { MessageType } from '@/components/chat/ChatMessage';
import { 
  generateChatTitle, 
  getCurrentTimeString,
  saveChatMessages 
} from '@/utils/chatUtils';

interface ChatActionsProps {
  chatId: string | undefined;
  isNewChat: boolean;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTokensPerSecond: React.Dispatch<React.SetStateAction<number | null>>;
  navigate: (to: string) => void;
  toast: any;
  updateChatHistory?: (chatItem: ChatItem) => void;
}

export const useChatActions = ({
  chatId,
  isNewChat,
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  setTokensPerSecond,
  navigate,
  toast,
  updateChatHistory
}: ChatActionsProps) => {
  
  const handleRegenerateResponse = async () => {
    // Find the last assistant message and the corresponding user message
    const lastAssistantMessageIndex = [...messages].reverse().findIndex(m => m.role === 'assistant');
    
    if (lastAssistantMessageIndex >= 0) {
      // Remove the last assistant message
      const lastIndex = messages.length - 1 - lastAssistantMessageIndex;
      const updatedMessages = [...messages];
      const removedMessage = updatedMessages.splice(lastIndex, 1)[0];
      setMessages(updatedMessages);
      
      // Find the most recent user message to regenerate from
      const userMessageIndex = lastIndex - 1 >= 0 && updatedMessages[lastIndex - 1].role === 'user' 
        ? lastIndex - 1 
        : updatedMessages.findIndex(m => m.role === 'user');
      
      if (userMessageIndex >= 0) {
        const userPrompt = updatedMessages[userMessageIndex].content;
        setIsLoading(true);
        setTokensPerSecond(null);
        const startTime = Date.now();
        
        try {
          // Call API with the user's original message
          const response = await generateText({
            prompt: userPrompt,
            length,
            temperature
          });
          
          const endTime = Date.now();
          const timeInSeconds = (endTime - startTime) / 1000;
          // Calculate approximate tokens (assuming ~4 chars per token)
          const estimatedTokens = response.generated.length / 4;
          setTokensPerSecond(estimatedTokens / timeInSeconds);
          
          const newAiMessage: MessageType = {
            id: Date.now().toString(),
            role: 'assistant',
            content: response.generated,
            timestamp: getCurrentTimeString(),
          };
          
          setMessages(prev => [...prev, newAiMessage]);
          
          // Save the updated messages to localStorage
          if (chatId && chatId !== 'new') {
            saveChatMessages(chatId, [...updatedMessages, newAiMessage]);
          }
          
          toast({
            title: 'Response regenerated',
            description: 'A new response has been generated for you.',
          });
        } catch (error) {
          console.error('Error regenerating response:', error);
          toast({
            title: 'Error',
            description: 'Failed to regenerate a response. Please try again.',
            variant: 'destructive'
          });
          
          // Add back the original message if regeneration fails
          setMessages(prev => [...prev, removedMessage]);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleSendMessage = async (content: string, temp: number, maxLength: number) => {
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: getCurrentTimeString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setTokensPerSecond(null);
    const startTime = Date.now();
    
    try {
      // Call the custom LLM API
      const response = await generateText({
        prompt: content,
        length: maxLength,
        temperature: temp
      });
      
      const endTime = Date.now();
      const timeInSeconds = (endTime - startTime) / 1000;
      // Calculate approximate tokens (assuming ~4 chars per token)
      const estimatedTokens = response.generated.length / 4;
      setTokensPerSecond(estimatedTokens / timeInSeconds);
      
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.generated,
        timestamp: getCurrentTimeString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // If this is a new chat, create a new chat in history and redirect
      if (isNewChat) {
        const newChatId = Date.now().toString();
        const chatTitle = generateChatTitle(content);
        const currentTime = getCurrentTimeString();
        
        const newChat: ChatItem = {
          id: newChatId,
          image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20 },
          title: chatTitle,
          preview: content.slice(0, 60) + (content.length > 60 ? '...' : ''),
          time: currentTime,
          href: `/chat/${newChatId}`
        };
        
        // Update chat history through prop if available
        if (updateChatHistory) {
          updateChatHistory(newChat);
        }
        
        // Save the current messages to the new chat's storage
        saveChatMessages(newChatId, [userMessage, aiMessage]);
        
        // Navigate to the new chat
        navigate(`/chat/${newChatId}`);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a response. Please try again.',
        variant: 'destructive'
      });
      
      // Add fallback message if API call fails
      const fallbackMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I couldn't process your request right now. The API connection might be down or experiencing issues.",
        timestamp: getCurrentTimeString(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleRegenerateResponse,
    handleSendMessage
  };
};
