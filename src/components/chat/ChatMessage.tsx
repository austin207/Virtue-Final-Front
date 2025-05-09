
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { MessageAvatar } from './MessageAvatar';
import { MessageContent } from './MessageContent';
import { MessageActions } from './MessageActions';
import { fadeIn, getStaggeredAnimation } from '@/utils/animationUtils';

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
  animationDelay?: number;
  onRegenerateResponse?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  animationDelay = 0,
  onRegenerateResponse 
}) => {
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

  // Calculate staggered animation delay based on message index
  const staggeredStyle = getStaggeredAnimation(animationDelay);

  return (
    <div 
      className={cn(
        "py-8 px-4 md:px-6 transition-all",
        message.role === 'assistant' ? "bg-chat-light dark:bg-chat-dark" : "bg-white dark:bg-chat-darker"
      )}
      style={staggeredStyle}
    >
      <div className={`max-w-4xl mx-auto flex gap-4 ${fadeIn(1)}`}>
        <div className="flex-shrink-0 pt-1">
          <MessageAvatar role={message.role} />
        </div>

        <div className="flex-1">
          <div className={`flex items-center text-sm text-gray-500 mb-2 ${fadeIn(2)}`}>
            <span className="font-medium">
              {message.role === 'assistant' ? 'Response' : 'You'}
            </span>
            <span className="ml-2 text-gray-400">
              {message.timestamp} {message.timeAgo && `• ${message.timeAgo}`}
            </span>
          </div>

          <div className={`prose dark:prose-invert prose-sm sm:prose-base max-w-none ${fadeIn(3)}`}>
            <MessageContent role={message.role} content={message.content} />
          </div>

          {message.role === 'assistant' && (
            <MessageActions 
              reaction={reaction}
              onReaction={handleReaction}
              onCopy={handleCopy}
              onShare={handleShare}
              onRegenerate={onRegenerateResponse ? handleRegenerate : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
};
