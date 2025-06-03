
import { MessageSquare, Search, BookOpen, Settings, User, Database } from 'lucide-react';

export const getNavItems = () => [
  {
    title: "Chat",
    url: "/chat/new",
    icon: MessageSquare,
  },
  {
    title: "Browse",
    url: "/browse",
    icon: Search,
  },
  {
    title: "Collections",
    url: "/collections",
    icon: BookOpen,
  },
  {
    title: "Train Model",
    url: "/train",
    icon: Database,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export const getDefaultChatItem = (isActive: boolean = false) => ({
  id: 'new',
  title: 'New Chat',
  timestamp: new Date().toISOString(),
  isActive,
  preview: 'Start a new conversation'
});
