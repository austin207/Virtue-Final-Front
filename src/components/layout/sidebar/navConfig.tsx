
import { MessageSquare, Search, BookOpen, Settings, User, Database } from 'lucide-react';

export const getNavItems = () => [
  {
    icon: MessageSquare,
    label: "Chat",
    color: "text-blue-600",
    href: "/chat/new",
  },
  {
    icon: Search,
    label: "Browse", 
    color: "text-green-600",
    href: "/browse",
  },
  {
    icon: BookOpen,
    label: "Collections",
    color: "text-purple-600", 
    href: "/collections",
  },
  {
    icon: Database,
    label: "Train Model",
    color: "text-orange-600",
    href: "/train",
  },
  {
    icon: Settings,
    label: "Settings",
    color: "text-gray-600",
    href: "/settings",
  },
  {
    icon: User,
    label: "Profile",
    color: "text-indigo-600",
    href: "/profile",
  },
];

export const getDefaultChatItem = (isActive: boolean = false) => ({
  id: 'new',
  title: 'New Chat',
  time: 'now',
  active: isActive,
  preview: 'Start a new conversation',
  href: '/chat/new'
});
