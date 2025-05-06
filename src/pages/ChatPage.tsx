
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ChatMessage, MessageType } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateText } from '@/services/llmService';
import { ChatItem } from '@/components/layout/Sidebar';

// Helper function to generate chat title from prompt
const generateChatTitle = (prompt: string): string => {
  // Get first 5-10 words or 30 characters, whichever is shorter
  const words = prompt.split(' ');
  const title = words.slice(0, Math.min(5, words.length)).join(' ');
  return title.length > 30 ? title.substring(0, 30) + '...' : title;
};

// Helper function to get current time string
const getCurrentTimeString = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
};

interface ChatPageProps {
  updateChatHistory?: (chatItem: ChatItem) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ updateChatHistory }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatItem | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // Check if it's a new chat based on the chatId
    const isNew = chatId === 'new';
    setIsNewChat(isNew);
    
    // Clear messages whenever chatId changes
    setMessages([]);
    
    if (!isNew) {
      // Load chat messages from localStorage based on chatId
      loadChatMessages(chatId || '');
      
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
      localStorage.setItem(`chat_messages_${chatId}`, JSON.stringify(messages));
    }
  }, [messages, chatId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatMessages = (chatId: string) => {
    const savedMessages = localStorage.getItem(`chat_messages_${chatId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // If no saved messages, start with empty array
      setMessages([]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartNewChat = () => {
    navigate('/chat/new');
    setMessages([]);
    setIsNewChat(true);
    toast({
      title: 'New chat started',
      description: 'Ask me anything!',
    });
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: getCurrentTimeString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the custom LLM API
      const response = await generateText({
        prompt: content,
        length: 150,
        temperature: 0.8
      });
      
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
        localStorage.setItem(`chat_messages_${newChatId}`, JSON.stringify([userMessage, aiMessage]));
        
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
        
        try {
          // Call API with the user's original message
          const response = await generateText({
            prompt: userPrompt,
            length: 150,
            temperature: 0.9 // Slightly higher temperature for variation
          });
          
          const newAiMessage: MessageType = {
            id: Date.now().toString(),
            role: 'assistant',
            content: response.generated,
            timestamp: getCurrentTimeString(),
          };
          
          setMessages(prev => [...prev, newAiMessage]);
          
          // Save the updated messages to localStorage
          if (chatId && chatId !== 'new') {
            localStorage.setItem(`chat_messages_${chatId}`, JSON.stringify([...updatedMessages, newAiMessage]));
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

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-chat-darker">
        <h1 className="font-semibold">
          {isNewChat ? 'New Chat' : (currentChat?.title || 'Chat')}
        </h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              toast({
                title: 'Search',
                description: 'Search functionality would open here',
              });
            }}
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleStartNewChat}
          >
            <span className="text-lg">⋯</span>
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {isNewChat ? (
          <div className="flex-1 bg-white dark:bg-[#2A2B32] flex items-center justify-center">
            <h2 className="text-2xl font-light text-gray-600 dark:text-gray-300">
              What can I help with?
            </h2>
          </div>
        ) : (
          <div className="flex-1">
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onRegenerateResponse={message.role === 'assistant' ? handleRegenerateResponse : undefined}
              />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="py-8 px-4 md:px-6 bg-chat-light dark:bg-chat-dark">
            <div className="max-w-4xl mx-auto flex gap-4">
              <div className="flex-shrink-0 pt-1">
                <div className="h-8 w-8 rounded-full bg-ai-primary flex items-center justify-center">
                  <img src="/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png" alt="AI" className="h-6 w-6 animate-pulse" />
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

      {/* Chat Input */}
      <div className="border-t border-gray-200 dark:border-gray-500 py-4 mt-auto bg-white dark:bg-chat-darker">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};
