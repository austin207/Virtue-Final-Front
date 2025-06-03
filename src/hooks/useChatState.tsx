
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
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use the advanced settings hook
  const advancedSettings = useAdvancedSettings();

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    setChatHistory(history);
  }, []);

  // Handle chat ID changes with better state management
  useEffect(() => {
    const isNew = chatId === 'new' || !chatId;
    setIsNewChat(isNew);
    setIsInitialized(false);
    
    if (!isNew && chatId) {
      // Loading existing chat
      const loadedMessages = loadChatMessages(chatId);
      setMessages(loadedMessages);
      
      const savedChat = chatHistory.find(chat => chat.id === chatId);
      if (savedChat) {
        setCurrentChat(savedChat);
      } else {
        setCurrentChat(null);
      }
    } else {
      // New chat - ensure clean state
      setMessages([]);
      setCurrentChat(null);
      setTokensPerSecond(null);
    }
    
    // Mark as initialized after state is set
    setTimeout(() => setIsInitialized(true), 100);
  }, [chatId, chatHistory]);

  // Save messages to localStorage whenever they change (but only for existing chats)
  useEffect(() => {
    if (chatId && chatId !== 'new' && messages.length > 0 && isInitialized) {
      saveChatMessages(chatId, messages);
    }
  }, [messages, chatId, isInitialized]);

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
    isInitialized,
    ...advancedSettings
  };
};
