import React, { useState } from 'react';
import { Copy, ThumbsUp, ThumbsDown, Share2, RefreshCw } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export type MessageType = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  timeAgo?: string;
  reactions?: {
    liked?: boolean;
    disliked?: boolean;
  };
};

interface ChatMessageProps {
  message: MessageType;
  onRegenerateResponse?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRegenerateResponse }) => {
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(
    message.reactions?.liked ? 'like' : message.reactions?.disliked ? 'dislike' : null
  );
  const { toast } = useToast();

  const handleReaction = (type: 'like' | 'dislike') => {
    if (reaction === type) {
      setReaction(null);
      toast({
        title: type === 'like' ? 'Feedback removed' : 'Feedback removed',
        description: 'Thank you for your feedback',
      });
    } else {
      setReaction(type);
      toast({
        title: type === 'like' ? 'Liked' : 'Disliked',
        description: 'Thank you for your feedback',
      });
    }
    // In a real app, you would send this feedback to your backend
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: 'Copied to clipboard',
      description: 'The message has been copied to your clipboard.',
    });
  };

  const handleShare = () => {
    // In a real app, you might open a modal or implement sharing functionality
    toast({
      title: 'Share feature',
      description: 'Sharing functionality would open here',
    });
  };

  const handleRegenerate = () => {
    if (onRegenerateResponse) {
      onRegenerateResponse();
    }
  };

  return (
    <div className={cn(
      "py-8 px-4 md:px-6",
      message.role === 'assistant' ? "bg-chat-light dark:bg-chat-dark" : "bg-white dark:bg-chat-darker"
    )}>
      <div className="max-w-4xl mx-auto flex gap-4">
        <div className="flex-shrink-0 pt-1">
          {message.role === 'assistant' ? (
            <div className="h-8 w-8 rounded-full bg-ai-primary flex items-center justify-center">
              <img src="/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png" alt="AI" className="h-9 w-9" />
            </div>
          ) : (
            <Avatar className="h-8 w-8">
              <img src="/lovable-uploads/user.png" alt="User" />
            </Avatar>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="font-medium">
              {message.role === 'assistant' ? 'Response' : 'You'}
            </span>
            <span className="ml-2 text-gray-400">
              {message.timestamp} {message.timeAgo && `• ${message.timeAgo}`}
            </span>
          </div>

          <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none">
            {message.content}
          </div>

          {message.role === 'assistant' && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("rounded-full h-8 w-8", reaction === 'like' && "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300")}
                  onClick={() => handleReaction('like')}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("rounded-full h-8 w-8", reaction === 'dislike' && "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300")}
                  onClick={() => handleReaction('dislike')}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 gap-1.5 text-xs border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 bg-transparent dark:bg-transparent"
                onClick={handleRegenerate}
                >
              <RefreshCw className="h-3.5 w-3.5" /> 
                Regenerate Response
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 gap-1.5 text-xs border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 bg-transparent dark:bg-transparent"
                onClick={handleCopy}
                >
              <Copy className="h-3.5 w-3.5" /> 
                Copy
              </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-500"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
