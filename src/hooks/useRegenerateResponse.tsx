
import { streamGenerateText } from '@/services/llmService';
import { MessageType } from '@/components/chat/ChatMessage';
import { getCurrentTimeString, saveChatMessages } from '@/utils/chatUtils';
import { mapModelToServiceType } from '@/utils/modelUtils';

interface UseRegenerateResponseProps {
  chatId: string | undefined;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTokensPerSecond: React.Dispatch<React.SetStateAction<number | null>>;
  toast: any;
  temperature: number;
  length: number;
  top_K: number;
  top_P: number;
  repetition_penalty: number;
  selectedModel: string;
}

export const useRegenerateResponse = ({
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
}: UseRegenerateResponseProps) => {

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
            { 
              prompt: userPrompt, 
              length, 
              temperature,
              model: mapModelToServiceType(selectedModel),
              top_k: top_K,
              top_p: top_P,
              repetition_penalty
            },
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

  return { handleRegenerateResponse };
};
