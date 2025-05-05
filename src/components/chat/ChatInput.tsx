
import React, { useState } from 'react';
import { Wand2, ArrowUp, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean; // Added this prop
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage,
  placeholder = "Ask questions, or type '/' for commands",
  disabled = false // Added default value
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full px-4 pb-8 pt-4">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3 text-gray-500">
          <Wand2 className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full py-3 pl-11 pr-20 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-ai-primary dark:focus:ring-ai-primary disabled:opacity-50 disabled:cursor-not-allowed"
          autoFocus
        />
        <div className="absolute right-3 flex space-x-2">
          <Button 
            type="submit"
            size="icon" 
            className="h-8 w-8 bg-ai-primary hover:bg-ai-primary/90 text-white rounded-lg"
            disabled={!message.trim() || disabled}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-gray-200 dark:border-gray-600"
            disabled={disabled}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
