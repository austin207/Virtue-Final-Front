
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ChatMessage, MessageType } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isNewChat, setIsNewChat] = useState(chatId === 'new');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (chatId !== 'new') {
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
      setIsNewChat(false);
    } else {
      setMessages([]);
      setIsNewChat(true);
    }
  }, [chatId]);

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

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: 'just now',
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // In a real app, you would send the message to an API here
    // and wait for the response before adding the AI's message
    
    // For demo purposes, we'll simulate an AI response after a short delay
    setTimeout(() => {
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm just a demo AI assistant, so I can't provide a real response right now. In a real application, this would connect to an AI service like ChatGPT or a custom NLP backend.",
        timestamp: 'just now',
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    if (isNewChat) {
      setIsNewChat(false);
      navigate(`/chat/${Date.now()}`);
      // In a real app, you would create a new chat in the database
      // and update the URL with the new chat ID
    }
  };

  const handleRegenerateResponse = () => {
    // Find the last assistant message and the corresponding user message
    const lastAssistantMessageIndex = [...messages].reverse().findIndex(m => m.role === 'assistant');
    
    if (lastAssistantMessageIndex >= 0) {
      // Remove the last assistant message
      const lastIndex = messages.length - 1 - lastAssistantMessageIndex;
      const updatedMessages = [...messages];
      updatedMessages.splice(lastIndex, 1);
      setMessages(updatedMessages);
      
      // Simulate generating a new response
      setTimeout(() => {
        const newAiMessage: MessageType = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "This is a regenerated response! In a real application, this would be a new response from the AI service based on the same user query.",
          timestamp: 'just now',
        };
        
        setMessages(prev => [...prev, newAiMessage]);
        
        toast({
          title: 'Response regenerated',
          description: 'A new response has been generated for you.',
        });
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="font-semibold">{chatId === 'new' ? 'New Chat' : (chatId ?? 'Chat')}</h1>
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
      <div className="flex-1 overflow-y-auto">
        {isNewChat ? (
          <div className="h-full flex items-center justify-center">
            <h2 className="text-2xl font-light text-gray-600 dark:text-gray-300">
              What can I help with?
            </h2>
          </div>
        ) : (
          messages.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onRegenerateResponse={message.role === 'assistant' ? handleRegenerateResponse : undefined}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
