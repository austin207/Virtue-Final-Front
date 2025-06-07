
import { streamGenerateText } from '@/services/llmService';
import { ChatItem } from '@/components/layout/sidebar/types';
import { MessageType } from '@/components/chat/ChatMessage';
import { 
  generateChatTitle, 
  getCurrentTimeString,
  saveChatMessages 
} from '@/utils/chatUtils';
import { mapModelToServiceType } from '@/utils/modelUtils';

interface UseSendMessageProps {
  chatId: string | undefined;
  isNewChat: boolean;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTokensPerSecond: React.Dispatch<React.SetStateAction<number | null>>;
  navigate: (to: string) => void;
  toast: any;
  updateChatHistory?: (chatItem: ChatItem) => void;
  temperature: number;
  length: number;
  top_K: number;
  top_P: number;
  repetition_penalty: number;
  selectedModel: string;
}

export const useSendMessage = ({
  chatId,
  isNewChat,
  messages,
  setMessages,
  setIsLoading,
  setTokensPerSecond,
  navigate,
  toast,
  updateChatHistory,
  temperature,
  length,
  top_K,
  top_P,
  repetition_penalty,
  selectedModel
}: UseSendMessageProps) => {

  const handleSendMessage = async (
    content: string, 
    msgTemperature?: number, 
    maxLength?: number,
    topK?: number,
    topP?: number,
    repetitionPenalty?: number
  ) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: getCurrentTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setTokensPerSecond(null);

    let aiContent = "";
    const aiMessage: MessageType = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: "",
      timestamp: getCurrentTimeString(),
    };
    
    // Add AI message immediately to show loading state
    setMessages(prev => [...prev, aiMessage]);

    let tokenCount = 0;
    const startTime = Date.now();

    try {
      await streamGenerateText(
        { 
          prompt: content, 
          length: maxLength || length, 
          temperature: msgTemperature || temperature,
          model: mapModelToServiceType(selectedModel),
          top_k: topK || top_K,
          top_p: topP || top_P,
          repetition_penalty: repetitionPenalty || repetition_penalty
        },
        (token) => {
          aiContent += token;
          tokenCount += 1;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...aiMessage, content: aiContent };
            return updated;
          });
        }
      );

      const endTime = Date.now();
      const timeInSeconds = (endTime - startTime) / 1000;
      setTokensPerSecond(tokenCount / (timeInSeconds || 1));

      // Handle new chat creation
      if (isNewChat) {
        const newChatId = Date.now().toString();
        const chatTitle = generateChatTitle(content);
        const currentTime = getCurrentTimeString();

        const newChat: ChatItem = {
          id: newChatId,
          image: { src: "/uploads/user.png", width: 20, height: 20 },
          title: chatTitle,
          preview: content.slice(0, 60) + (content.length > 60 ? '...' : ''),
          time: currentTime,
          href: `/chat/${newChatId}`
        };

        if (updateChatHistory) {
          updateChatHistory(newChat);
        }
        
        const finalMessages = [userMessage, { ...aiMessage, content: aiContent }];
        saveChatMessages(newChatId, finalMessages);
        navigate(`/chat/${newChatId}`);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a response. Please try again.',
        variant: 'destructive'
      });

      const fallbackMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I couldn't process your request right now. The API connection might be down or experiencing issues.",
        timestamp: getCurrentTimeString(),
      };

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = fallbackMessage;
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSendMessage };
};
