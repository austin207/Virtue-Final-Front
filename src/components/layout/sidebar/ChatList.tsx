
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChatItem } from './types';

type ChatListProps = {
  chatItems: ChatItem[];
};

export const ChatList = ({ chatItems }: ChatListProps) => {
  const location = useLocation();
  
  return (
    <>
      {chatItems.map((chat, index) => (
        <Link 
          to={chat.href} 
          key={chat.id || index}
          className={cn(
            "block mb-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
            location.pathname === chat.href && "bg-gray-100 dark:bg-gray-800",
            chat.active && "bg-green-50 dark:bg-green-900/20"
          )}
        >
          <div className="flex items-start">
            {chat.image && (
              <img
                src={chat.image.src}
                alt={chat.title}
                width={chat.image.width}
                height={chat.image.height}
                className="flex-shrink-0 mr-2"
                style={{ objectFit: "contain" }}
              />
            )}
            {chat.icon && (
              <div className="flex-shrink-0 mr-2">
                {chat.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-400 truncate">{chat.preview}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
