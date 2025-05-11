
import { streamGenerateText } from '@/services/llmService';
import { ChatItem } from '@/components/layout/sidebar/types';
import { MessageType } from '@/components/chat/ChatMessage';
import { 
  generateChatTitle, 
  getCurrentTimeString,
  saveChatMessages 
} from '@/utils/chatUtils';

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
  length = 150
}: ChatActionsProps) => {

  const handleRegenerateResponse = async () => {
    const lastAssistantMessageIndex = [...messages].reverse().findIndex(m => m.role === 'assistant');
    if (lastAssistantMessageIndex >= 0) {
      const lastIndex = messages.length - 1 - lastAssistantMessageIndex;
      const updatedMessages = [...messages];
      const removedMessage = updatedMessages.splice(lastIndex, 1)[0];
      setMessages(updatedMessages);

      const userMessageIndex = lastIndex - 1 >= 0 && updatedMessages[lastIndex - 1].role === 'user' 
        ? lastIndex - 1 
        : updatedMessages.findIndex(m => m.role === 'user');

      if (userMessageIndex >= 0) {
        const userPrompt = updatedMessages[userMessageIndex].content;
        setIsLoading(true);
        setTokensPerSecond(null);
        let aiContent = "";
        const startTime = Date.now();
        const newAiMessage: MessageType = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "",
          timestamp: getCurrentTimeString(),
        };
        setMessages(prev => [...prev, newAiMessage]);
        let tokenCount = 0;

        try {
          await streamGenerateText(
            { prompt: userPrompt, length, temperature },
            (token) => {
              aiContent += token;
              tokenCount += 1;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...newAiMessage, content: aiContent };
                return updated;
              });
            }
          );
          const endTime = Date.now();
          const timeInSeconds = (endTime - startTime) / 1000;
          setTokensPerSecond(tokenCount / (timeInSeconds || 1));

          // Save updated messages to localStorage
          if (chatId && chatId !== 'new') {
            saveChatMessages(chatId, [...updatedMessages, { ...newAiMessage, content: aiContent }]);
          }

          toast({
            title: 'Response regenerated',
            description: 'A new response has been generated for you.',
          });
        } catch (error) {
          console.error('Error regenerating response:', error);
          toast({
            title: 'Error',
            description: 'Failed to regenerate a response. Please try again.',
            variant: 'destructive'
          });
          setMessages(prev => [...prev, removedMessage]);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleSendMessage = async (content: string, msgTemperature?: number, maxLength?: number) => {
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
    setMessages(prev => [...prev, aiMessage]);

    let tokenCount = 0;
    const startTime = Date.now();

    try {
      await streamGenerateText(
        { 
          prompt: content, 
          length: maxLength || length, 
          temperature: msgTemperature || temperature 
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

      // If this is a new chat, create a new chat in history and redirect
      if (isNewChat) {
        const newChatId = Date.now().toString();
        const chatTitle = generateChatTitle(content);
        const currentTime = getCurrentTimeString();

        const newChat: ChatItem = {
          id: newChatId,
          image: { src: "/uploads/aee35629-9539-47bc-973b-4a7479c24dc7.png", width: 20, height: 20 },
          title: chatTitle,
          preview: content.slice(0, 60) + (content.length > 60 ? '...' : ''),
          time: currentTime,
          href: `/chat/${newChatId}`
        };

        if (updateChatHistory) {
          updateChatHistory(newChat);
        }
        saveChatMessages(newChatId, [userMessage, { ...aiMessage, content: aiContent }]);
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

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleRegenerateResponse,
    handleSendMessage
  };
};
