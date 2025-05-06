
import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, Share2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface MessageActionsProps {
  reaction: 'like' | 'dislike' | null;
  onReaction: (type: 'like' | 'dislike') => void;
  onCopy: () => void;
  onShare: () => void;
  onRegenerate?: () => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({ 
  reaction,
  onReaction, 
  onCopy, 
  onShare, 
  onRegenerate 
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("rounded-full h-8 w-8", reaction === 'like' && "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300")}
          onClick={() => onReaction('like')}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("rounded-full h-8 w-8", reaction === 'dislike' && "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300")}
          onClick={() => onReaction('dislike')}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {onRegenerate && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1.5 text-xs border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 bg-transparent dark:bg-transparent"
            onClick={onRegenerate}
          >
            <RefreshCw className="h-3.5 w-3.5" /> 
            Regenerate Response
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1.5 text-xs border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 bg-transparent dark:bg-transparent"
          onClick={onCopy}
        >
          <Copy className="h-3.5 w-3.5" /> 
          Copy
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-500"
          onClick={onShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
