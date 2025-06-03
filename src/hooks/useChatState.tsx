
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatItem } from '@/components/layout/sidebar/types';
import { MessageType } from '@/components/chat/ChatMessage';
import { useAdvancedSettings } from '@/hooks/useAdvancedSettings';
import { 
  loadChatMessages, 
  loadChatHistory, 
  saveChatMessages 
} from '@/utils/chatUtils';

export const useChatState = (updateChatHistory?: (chatItem: ChatItem) => void) => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatItem | null>(null);
  const [tokensPerSecond, setTokensPerSecond] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use the new advanced settings hook
  const advancedSettings = useAdvancedSettings();

  // Load chat history on mount
  useEffect(() => {
    setChatHistory(loadChatHistory());
  }, []);

  // Handle chat ID changes
  useEffect(() => {
    const isNew = chatId === 'new';
    setIsNewChat(isNew);
    setMessages([]);
    
    if (!isNew && chatId) {
      const loadedMessages = loadChatMessages(chatId);
      setMessages(loadedMessages);
      
      const savedChat = chatHistory.find(chat => chat.id === chatId);
      if (savedChat) {
        setCurrentChat(savedChat);
      }
    } else {
      setCurrentChat(null);
    }
  }, [chatId, chatHistory]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (chatId && chatId !== 'new' && messages.length > 0) {
      saveChatMessages(chatId, messages);
    }
  }, [messages, chatId]);

  return {
    chatId,
    messages,
    setMessages,
    isNewChat,
    isLoading,
    setIsLoading,
    chatHistory,
    setChatHistory,
    currentChat,
    tokensPerSecond,
    setTokensPerSecond,
    navigate,
    toast,
    ...advancedSettings
  };
};
