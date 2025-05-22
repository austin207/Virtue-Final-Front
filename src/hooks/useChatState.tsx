import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatItem } from '@/components/layout/sidebar/types';
import { MessageType } from '@/components/chat/ChatMessage';
import { 
  generateChatTitle, 
  getCurrentTimeString,
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
  const [temperature, setTemperature] = useState(0.8);
  const [length, setLength] = useState(150);
  const [top_K, setTopK] = useState(40);
  const [top_P, setTopP] = useState(0.9);
  const [repetition_penalty, setRepetitionPenalty] = useState(1.1);
  const [tokensPerSecond, setTokensPerSecond] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load chat history and advanced settings from localStorage on mount
  useEffect(() => {
    setChatHistory(loadChatHistory());
    
    // Load advanced settings from localStorage if available
    const savedSettings = localStorage.getItem('advancedSettings');
    if (savedSettings) {
      try {
        const { 
          temperature: savedTemp, 
          length: savedLength,
          top_K: savedTopK,
          top_P: savedTopP,
          repetition_penalty: savedRepetitionPenalty 
        } = JSON.parse(savedSettings);
        if (savedTemp !== undefined) setTemperature(savedTemp);
        if (savedLength !== undefined) setLength(savedLength);
        if (savedTopK !== undefined) setTopK(savedTopK);
        if (savedTopP !== undefined) setTopP(savedTopP);
        if (savedRepetitionPenalty !== undefined) setRepetitionPenalty(savedRepetitionPenalty);
      } catch (error) {
        console.error("Failed to parse advanced settings:", error);
      }
    }
  }, []);
  
  // Save advanced settings whenever they change
  useEffect(() => {
    localStorage.setItem('advancedSettings', JSON.stringify({ 
      temperature, 
      length,
      top_K,
      top_P,
      repetition_penalty
    }));
  }, [temperature, length, top_K, top_P, repetition_penalty]);

  // Handle chat ID changes
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
    tokensPerSecond,
    setTokensPerSecond,
    navigate,
    toast
  };
};
