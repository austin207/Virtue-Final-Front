
import { ChatItem } from '@/components/layout/sidebar/types';
import { MessageType } from '@/components/chat/ChatMessage';
import { useRegenerateResponse } from '@/hooks/useRegenerateResponse';
import { useSendMessage } from '@/hooks/useSendMessage';

interface ChatActionsProps {
  chatId: string | undefined;
  isNewChat: boolean;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTokensPerSecond: React.Dispatch<React.SetStateAction<number | null>>;
  navigate: (to: string) => void;
  toast: any;
  updateChatHistory?: (chatItem: ChatItem) => void;
  temperature?: number;
  length?: number;
  top_K?: number;
  top_P?: number;
  repetition_penalty?: number;
  selectedModel?: string;
}

export const useChatActions = ({
  chatId,
  isNewChat,
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  setTokensPerSecond,
  navigate,
  toast,
  updateChatHistory,
  temperature = 0.8,
  length = 150,
  top_K = 40,
  top_P = 0.9,
  repetition_penalty = 1.1,
  selectedModel = 'virtue-v2'
}: ChatActionsProps) => {

  const { handleRegenerateResponse } = useRegenerateResponse({
    chatId,
    messages,
    setMessages,
    setIsLoading,
    setTokensPerSecond,
    toast,
    temperature,
    length,
    top_K,
    top_P,
    repetition_penalty,
    selectedModel
  });

  const { handleSendMessage } = useSendMessage({
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
  });

  return {
    handleRegenerateResponse,
    handleSendMessage
  };
};
