
import React from 'react';
import { Avatar } from '@/components/ui/avatar';

interface MessageAvatarProps {
  role: 'user' | 'assistant';
}

export const MessageAvatar: React.FC<MessageAvatarProps> = ({ role }) => {
  if (role === 'assistant') {
    return (
      <div className="h-8 w-8 rounded-full bg-ai-primary flex items-center justify-center">
        <img src="/uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png" alt="AI" className="h-9 w-9" />
      </div>
    );
  }
  
  return (
    <Avatar className="h-8 w-8">
      <img src="/uploads/user.png" alt="User" />
    </Avatar>
  );
};
