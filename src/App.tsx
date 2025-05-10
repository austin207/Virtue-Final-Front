
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { lazy, Suspense, useState, useEffect } from "react";
import { ChatItem } from "@/components/layout/sidebar/types";
import "./App.css";

// Lazy load pages for better performance
const ChatPage = lazy(() => import("@/pages/ChatPage").then(module => ({ default: module.ChatPage })));
const BrowsePage = lazy(() => import("@/pages/BrowsePage").then(module => ({ default: module.BrowsePage })));
const CollectionsPage = lazy(() => import("@/pages/CollectionsPage").then(module => ({ default: module.CollectionsPage })));
const SettingsPage = lazy(() => import("@/pages/SettingsPage").then(module => ({ default: module.SettingsPage })));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a client with default options enhanced for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

const AppContent = () => {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const navigate = useNavigate();

  // Load chat history and settings from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to parse chat history:", error);
        localStorage.removeItem('chatHistory');
      }
    }
    
    // Load advanced mode setting
    const savedAdvancedMode = localStorage.getItem('advancedMode');
    if (savedAdvancedMode) {
      try {
        setAdvancedMode(JSON.parse(savedAdvancedMode));
      } catch (error) {
        console.error("Failed to parse advanced mode setting:", error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);
  
  // Save advanced mode setting whenever it changes
  useEffect(() => {
    localStorage.setItem('advancedMode', JSON.stringify(advancedMode));
  }, [advancedMode]);

  const handleNewChat = () => {
    navigate('/chat/new');
  };

  const updateChatHistory = (newChat: ChatItem) => {
    setChatHistory(prev => {
      const filtered = prev.filter(chat => chat.id !== newChat.id);
      return [newChat, ...filtered];
    });
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <MainLayout 
                chatItems={chatHistory}
                onNewChat={handleNewChat} 
                advancedMode={advancedMode}
                setAdvancedMode={setAdvancedMode}
              />
            }>
              <Route index element={<Navigate to="/chat/new" replace />} />
              <Route path="chat/:chatId" element={
                <ChatPage 
                  updateChatHistory={updateChatHistory} 
                  advancedMode={advancedMode} 
                  setAdvancedMode={setAdvancedMode} 
                />
              } />
              <Route path="browse" element={<BrowsePage />} />
              <Route path="collections" element={<CollectionsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
