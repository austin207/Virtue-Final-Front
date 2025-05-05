import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PenLine, Search, Lightbulb, Plus, MessageSquare, BookMarked, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/components/providers/ThemeProvider';
import { logo } from '@/assets';

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  chatItems?: ChatItem[];
  onNewChat?: () => void;
};

// Updated ChatItem type
export type ChatItem = {
  id?: string;
  image?: { src: string; width: number; height: number };
  title: string;
  preview: string;
  time: string;
  active?: boolean;
  href: string;
};

export const Sidebar = ({ collapsed, setCollapsed, chatItems = [], onNewChat }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("chats"); // chats or saved

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      navigate('/chat/new');
    }
  };

  const navItems = [
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

  // ---- UPDATED: Use image property for chat items ----
  const defaultChatItems = [
    {
      id: "cosmic-evolution",
      image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20},
      title: "Cosmic Evolution",
      preview: "Some 15 billion years ago the universe emerged from a hot, dense sea of...",
      time: "9:34 PM",
      href: "/chat/cosmic-evolution"
    },
    {
      id: "new",
      image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20},
      title: "New Chat",
      preview: "Ask anything!",
      time: "Now",
      active: location.pathname === "/chat/new",
      href: "/chat/new"
    },
    {
      image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20},
      title: "Competitive Analysis research",
      preview: "A competitive analysis of restaurant delivery mobile applications reveals key insights ...",
      time: "Thu",
      href: "/chat/competitive-analysis"
    },
    {
      image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20},
      title: "User Personas Research",
      preview: "User persona research is a process of creating fictional but realistic representati...",
      time: "Mon",
      href: "/chat/user-personas"
    },
    {
      image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20},
      title: "Call To Action texts",
      preview: 'here are a few examples of CTA button text\n1. "Get started now" ...',
      time: "17 Oct",
      href: "/chat/cta-texts"
    },
    {
      image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20},
      title: "Video Script Intros",
      preview: "Hi, I'm [insert name here], and I'm on my way to Prague, one of the most beautiful...",
      time: "10 Oct",
      href: "/chat/video-scripts"
    },
    {
      image: { src: "/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20},
      title: "UX of a Banana",
      preview: "Are you sure you want to delete this file? This action cannot be undone and the file...",
      time: "21 Aug",
      href: "/chat/ux-banana"
    },
  ];

  const displayChatItems = chatItems.length > 0 ? chatItems : defaultChatItems;

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-20 h-full chat-sidebar border-r-4 border-gray-200 dark:border-gray-500 transition-all duration-300",
        collapsed ? "w-[60px]" : "w-[260px] md:w-[300px]"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-500">
          {!collapsed && (
            <div className="flex items-center">
              <img src="/lovable-uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png" alt="Logo" className="h-9 w-9 mr-2" />
              <h1 className="text-lg font-semibold">My Chats</h1>
            </div>
          )}

          {collapsed ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-10 h-10 p-0 ml-auto"
              onClick={() => setCollapsed(false)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
               variant="outline" 
               size="icon" 
               className="w-8 h-8 p-0 border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
               onClick={handleNewChat}
               aria-label="New Chat"
                >
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                <span className="text-lg">⋯</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 p-0"
                onClick={() => setCollapsed(true)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar Tabs */}
        {!collapsed && (
          <div className="flex p-3 space-x-1">
            <Button 
              variant={activeTab === "chats" ? "secondary" : "ghost"} 
              size="sm"
              className="flex-1 justify-start px-2"
              onClick={() => setActiveTab("chats")}
            >
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
                CHATS
              </span>
              <span className="ml-2 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">24</span>
            </Button>
            <Button 
              variant={activeTab === "saved" ? "secondary" : "ghost"} 
              size="sm"
              className="flex-1 justify-start px-2"
              onClick={() => setActiveTab("saved")}
            >
              <span className="flex items-center">
                <BookMarked className="h-4 w-4 mr-2" />
                SAVED
              </span>
              <span className="ml-2 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">24</span>
            </Button>
          </div>
        )}

        {/* Search Bar */}
        {!collapsed && (
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full py-2 pl-10 pr-8 bg-gray-100 dark:bg-gray-800 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button className="absolute top-1/2 transform -translate-y-1/2 right-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded">
                  <span className="text-xs">≡</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {collapsed ? (
            <div className="flex flex-col items-center space-y-4 py-4">
              {navItems.map((item, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        to={item.href} 
                        className={cn(
                          "sidebar-button",
                          location.pathname === item.href && "sidebar-button-active"
                        )}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          ) : (
            displayChatItems.map((chat, index) => (
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
                  {/* ---- UPDATED: Render image instead of icon ---- */}
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
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{chat.preview}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-500">
          {collapsed ? (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-8 w-8">
                <img src="public/lovable-uploads/c6a91980-5954-4039-8eb2-1eb60a0b573e.png" alt="User" />
              </Avatar>
              <Toggle
                size="sm"
                pressed={theme === "dark"}
                onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Toggle>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <img src="/lovable-uploads/user.png" alt="User" />
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">You</span>
                    <span className="ml-1 px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded text-xs">PRO</span>
                  </div>
                </div>
              </div>
              <Toggle
                size="sm"
                pressed={theme === "dark"}
                onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Toggle>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
