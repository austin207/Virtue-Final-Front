
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatInput } from '@/components/chat/ChatInput';
import { useToast } from '@/hooks/use-toast';
import { generateText } from '@/services/llmService';
import { ChatItem } from '@/components/layout/sidebar/types';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { 
  generateChatTitle, 
  getCurrentTimeString, 
  loadChatMessages, 
  loadChatHistory, 
  saveChatMessages 
} from '@/utils/chatUtils';
import { MessageType } from '@/components/chat/ChatMessage';

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
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatItem | null>(null);
  const [temperature, setTemperature] = useState(0.8);
  const [length, setLength] = useState(150);
  const [tokensPerSecond, setTokensPerSecond] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Load chat history from localStorage on mount
  useEffect(() => {
    setChatHistory(loadChatHistory());
    
    // Load advanced settings from localStorage if available
    const savedSettings = localStorage.getItem('advancedSettings');
    if (savedSettings) {
      try {
        const { temperature: savedTemp, length: savedLength } = JSON.parse(savedSettings);
        if (savedTemp !== undefined) setTemperature(savedTemp);
        if (savedLength !== undefined) setLength(savedLength);
      } catch (error) {
        console.error("Failed to parse advanced settings:", error);
      }
    }
  }, []);
  
  // Save advanced settings whenever they change
  useEffect(() => {
    localStorage.setItem('advancedSettings', JSON.stringify({ temperature, length }));
  }, [temperature, length]);

  useEffect(() => {
    // Check if it's a new chat based on the chatId
    const isNew = chatId === 'new';
    setIsNewChat(isNew);
    
    // Clear messages whenever chatId changes
    setMessages([]);
    
    if (!isNew) {
      // Load chat messages from localStorage based on chatId
      const loadedMessages = loadChatMessages(chatId || '');
      setMessages(loadedMessages);
      
      // Find the current chat in history
      const savedChat = chatHistory.find(chat => chat.id === chatId);
      if (savedChat) {
        setCurrentChat(savedChat);
      }
    } else {
      // Clear messages for new chat
      setMessages([]);
      setCurrentChat(null);
    }
  }, [chatId, chatHistory]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (chatId && chatId !== 'new' && messages.length > 0) {
      saveChatMessages(chatId, messages);
    }
  }, [messages, chatId]);

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

  const handleSendMessage = async (content: string, temp = temperature, maxLength = length) => {
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
        
        // Update chat history in state
        setChatHistory(prev => [newChat, ...prev.filter(chat => chat.id !== 'new')]);
        
        // Save the current messages to the new chat's storage
        saveChatMessages(newChatId, [userMessage, aiMessage]);
        
        // Navigate to the new chat
        setIsNewChat(false);
        navigate(`/chat/${newChatId}`);
        setCurrentChat(newChat);
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
    </div>
  );
};
