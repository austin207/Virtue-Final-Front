
import { MessageSquare, Search, BookOpen, Database, Settings, User } from 'lucide-react';
import { NavItem, ChatItem } from './types';

export const getNavItems = (): NavItem[] => [
  {
    icon: MessageSquare,
    label: 'Chat',
    color: 'bg-gray-500 hover:bg-gray-600',
    href: '/chat/new'
  },
  {
    icon: Search,
    label: 'Browse',
    color: 'bg-gray-500 hover:bg-gray-600',
    href: '/browse'
  },
  {
    icon: BookOpen,
    label: 'Collections',
    color: 'bg-gray-500 hover:bg-gray-600',
    href: '/collections'
  },
  {
    icon: Database,
    label: 'Train Model',
    color: 'bg-gray-500 hover:bg-gray-600',
    href: '/train-model'
  },
  {
    icon: Settings,
    label: 'Settings',
    color: 'bg-gray-500 hover:bg-gray-600',
    href: '/settings'
  },
  {
    icon: User,
    label: 'Profile',
    color: 'bg-gray-500 hover:bg-gray-600',
    href: '/profile'
  }
];

export const getDefaultChatItem = (isActive: boolean = false): ChatItem => ({
  id: 'new-chat',
  title: 'New Chat',
  preview: 'Start a new conversation',
  time: 'now',
  href: '/chat/new',
  active: isActive
});
