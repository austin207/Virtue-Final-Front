
import React from 'react';
import { PenLine, Search, Lightbulb, MessageSquare } from 'lucide-react';
import { NavItem } from './types';

export const getNavItems = (): NavItem[] => {
  return [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Chat",
      color: "text-green-500 bg-green-100 dark:bg-green-900/30",
      href: "/",
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: "Browse",
      color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
      href: "/browse",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      label: "Collections",
      color: "text-amber-500 bg-amber-100 dark:bg-amber-900/30",
      href: "/collections",
    },
    {
      icon: <PenLine className="h-5 w-5" />,
      label: "Settings",
      color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30",
      href: "/settings",
    },
  ];
};

export const getDefaultChatItem = (isActive: boolean) => {
  return {
    id: "new",
    image: { src: "/uploads/user.png", width: 20, height: 20 },
    title: "New Chat",
    preview: "Ask anything!",
    time: "Now",
    active: isActive,
    href: "/chat/new"
  };
};
