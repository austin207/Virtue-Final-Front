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

export const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
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

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);
  
  useEffect(() => {
    // Check if it's a new chat based on the chatId
    setIsNewChat(chatId === 'new');
    
    if (chatId !== 'new') {
      // Try to load chat from history if it exists
      const savedChat = chatHistory.find(chat => chat.id === chatId);
      
      if (savedChat) {
        // In a real app, you'd fetch chat messages based on the ID
        // For now, we'll just show a mock message
        setMessages([
          {
            id: '1',
            role: 'user',
            content: savedChat.preview,
            timestamp: savedChat.time,
          },
          {
            id: '2',
            role: 'assistant',
            content: "Here's a response to your query about " + savedChat.title,
            timestamp: savedChat.time,
          }
        ]);
      } else {
        // Mock data - in a real app, you'd fetch chat history from an API
        setMessages([
          {
            id: '1',
            role: 'user',
            content: "How do you define usability testing in UX design?",
            timestamp: '24 Sep • 11:30 PM',
          },
          {
            id: '2',
            role: 'assistant',
            content: "Usability testing is a technique used in user experience (UX) design to evaluate a product or service by testing it with representative users. The purpose of usability testing is to identify any usability problems, collect quantitative and qualitative data on users' experiences, and determine the overall user satisfaction with the product or service.",
            timestamp: '24 Sep • 11:30 PM',
          },
          {
            id: '3',
            role: 'user',
            content: "you're a UX writer now. Generate 3 versions of 404 error messages for a ecommerce clothing website.",
            timestamp: '1 min ago',
            timeAgo: 'just now',
          },
          {
            id: '4',
            role: 'assistant',
            content: "Sure! Here are three different versions of 404 error messages for an ecommerce clothing website:\n\n1. Uh-oh! It looks like the page you're looking for isn't here. Please check the URL and try again or return to the homepage to continue shopping.\n\n2. Whoops! We can't seem to find the page you're looking for. Please double-check the URL or use our search bar to find what you need. You can also browse our collection of stylish clothes and accessories.\n\n3. Sorry, the page you're trying to access isn't available. It's possible that the item has sold out or the page has been removed. Please click back to return to the previous page or head over to our homepage to explore more.",
            timestamp: '',
            timeAgo: 'just now',
          }
        ]);
      }
    } else {
      // Clear messages for new chat
      setMessages([]);
    }
  }, [chatId, chatHistory]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      timestamp: 'just now',
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
        timestamp: 'just now',
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // If this is a new chat, create a new chat in history and redirect
      if (isNewChat) {
        const newChatId = Date.now().toString();
        const chatTitle = generateChatTitle(content);
        const currentTime = getCurrentTimeString();
        
        const newChat: ChatItem = {
          id: newChatId,
          icon: '💬', // Default icon, could be more dynamic based on content
          title: chatTitle,
          preview: content.slice(0, 60) + (content.length > 60 ? '...' : ''),
          time: currentTime,
          href: `/chat/${newChatId}`
        };
        
        // Update chat history
        setChatHistory(prev => [newChat, ...prev.filter(chat => chat.id !== 'new')]);
        
        // Navigate to the new chat
        setIsNewChat(false);
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
        timestamp: 'just now',
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
            timestamp: 'just now',
          };
          
          setMessages(prev => [...prev, newAiMessage]);
          
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
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="font-semibold">
          {isNewChat ? 'New Chat' : (chatHistory.find(chat => chat.id === chatId)?.title || chatId)}
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
          <div className="flex-1 flex items-center justify-center">
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
                  <img src="public/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png" alt="AI" className="h-6 w-6 animate-pulse" />
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
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 mt-auto">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};
