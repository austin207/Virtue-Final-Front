
import { ChatItem } from '@/components/layout/Sidebar';

// Helper function to generate chat title from prompt
export const generateChatTitle = (prompt: string): string => {
  // Get first 5-10 words or 30 characters, whichever is shorter
  const words = prompt.split(' ');
  const title = words.slice(0, Math.min(5, words.length)).join(' ');
  return title.length > 30 ? title.substring(0, 30) + '...' : title;
};

// Helper function to get current time string
export const getCurrentTimeString = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
};

// Load chat messages from localStorage
export const loadChatMessages = (chatId: string) => {
  const savedMessages = localStorage.getItem(`chat_messages_${chatId}`);
  if (savedMessages) {
    return JSON.parse(savedMessages);
  }
  return [];
};

// Load chat history from localStorage
export const loadChatHistory = (): ChatItem[] => {
  const savedHistory = localStorage.getItem('chatHistory');
  if (savedHistory) {
    return JSON.parse(savedHistory);
  }
  return [];
};

// Save chat history to localStorage
export const saveChatHistory = (history: ChatItem[]) => {
  localStorage.setItem('chatHistory', JSON.stringify(history));
};

// Save chat messages to localStorage
export const saveChatMessages = (chatId: string, messages: any[]) => {
  localStorage.setItem(`chat_messages_${chatId}`, JSON.stringify(messages));
};
