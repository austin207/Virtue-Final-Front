
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatPage } from "@/pages/ChatPage";
import { EmptyPage } from "@/pages/EmptyPage";
import NotFound from "./pages/NotFound";
import "./App.css";
import { useState, useEffect } from "react";
import { ChatItem } from "@/components/layout/sidebar/types";

const queryClient = new QueryClient();

const AppContent = () => {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const navigate = useNavigate();

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

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
        <Routes>
          <Route path="/" element={
            <MainLayout 
              chatItems={chatHistory}
              onNewChat={handleNewChat} 
            />
          }>
            <Route index element={<Navigate to="/chat/new" replace />} />
            <Route path="chat/:chatId" element={<ChatPage updateChatHistory={updateChatHistory} />} />
            <Route path="browse" element={<EmptyPage />} />
            <Route path="collections" element={<EmptyPage />} />
            <Route path="settings" element={<EmptyPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
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
