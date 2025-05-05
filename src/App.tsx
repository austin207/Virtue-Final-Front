
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatPage } from "@/pages/ChatPage";
import { EmptyPage } from "@/pages/EmptyPage";
import NotFound from "./pages/NotFound";
import "./App.css";
import { useState, useEffect } from "react";
import { ChatItem } from "@/components/layout/Sidebar";

const queryClient = new QueryClient();

const App = () => {
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleNewChat = () => {
    window.location.href = '/chat/new';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <MainLayout 
                  chatItems={chatHistory}
                  onNewChat={handleNewChat} 
                />
              }>
                <Route index element={<Navigate to="/chat/new" replace />} />
                <Route path="chat/:chatId" element={<ChatPage />} />
                <Route path="browse" element={<EmptyPage />} />
                <Route path="collections" element={<EmptyPage />} />
                <Route path="settings" element={<EmptyPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
