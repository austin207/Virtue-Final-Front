
import React, { useState, useEffect, useRef } from 'react';
import { Wand2, ArrowUp, Mic, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { QuickAssistanceModal } from '@/components/chat/QuickAssistanceModal';
import { SearchModal } from '@/components/search/SearchModal';

interface ChatInputProps {
  onSendMessage: (message: string, temperature?: number, length?: number, topK?: number, topP?: number, repetitionPenalty?: number) => void;
  placeholder?: string;
  disabled?: boolean;
  advancedMode?: boolean;
  temperature?: number;
  setTemperature?: (value: number) => void;
  length?: number;
  setLength?: (value: number) => void;
  top_K?: number;
  setTopK?: (value: number) => void;
  top_P?: number;
  setTopP?: (value: number) => void;
  repetition_penalty?: number;
  setRepetitionPenalty?: (value: number) => void;
  tokensPerSecond?: number | null;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = "Ask questions, or type '/' for commands",
  disabled = false,
  advancedMode = false,
  temperature = 0.8,
  setTemperature,
  length = 150,
  setLength,
  top_K = 40,
  setTopK,
  top_P = 0.9,
  setTopP,
  repetition_penalty = 1.1,
  setRepetitionPenalty,
  tokensPerSecond = null,
}) => {
  const [message, setMessage] = useState('');
  const [showQuickAssistance, setShowQuickAssistance] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { chatId } = useParams<{ chatId: string }>();

  // Focus input when it's a new chat or chatId changes
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [chatId, disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, temperature, length, top_K, top_P, repetition_penalty);
      setMessage('');
    }
  };

  const handleInsertSearchResults = (results: string) => {
    setMessage(prev => prev + (prev ? '\n\n' : '') + results);
  };

  return (
    <>
      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <div className="input-icon">
            <Wand2 />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="chat-input-field"
          />
          <div className="input-buttons">
            <button
              type="submit"
              className={`input-button primary ${(!message.trim() || disabled) ? 'disabled' : ''}`}
              disabled={!message.trim() || disabled}
            >
              <ArrowUp />
            </button>
            <button
              type="button"
              className="input-button"
              onClick={() => setShowSearch(true)}
              title="Web Search"
            >
              <Search />
            </button>
            <button
              type="button"
              className="input-button"
              onClick={() => setShowQuickAssistance(true)}
              title="Quick Assistance"
            >
              <HelpCircle />
            </button>
            <button
              type="button"
              className={`input-button ${disabled ? 'disabled' : ''}`}
              disabled={disabled}
              title="Voice Input"
            >
              <Mic />
            </button>
          </div>
        </form>
      </div>

      <QuickAssistanceModal
        isOpen={showQuickAssistance}
        onClose={() => setShowQuickAssistance(false)}
      />

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onInsertResults={handleInsertSearchResults}
      />

      <style>{`
        .chat-input-container {
          position: relative;
          max-width: 768px;
          margin: 0 auto;
          width: 100%;
          padding: 16px 16px 32px 16px;
        }

        .chat-input-form {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #9ca3af;
          width: 20px;
          height: 20px;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-input-field {
          width: 100%;
          padding: 12px 12px 12px 44px;
          padding-right: 128px;
          background-color: #374151 !important;
          border-radius: 8px;
          border: 1px solid #4b5563 !important;
          color: #f9fafb !important;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .chat-input-field:focus {
          border-color: #6b7280 !important;
          box-shadow: 0 0 0 2px rgba(107, 114, 128, 0.2);
        }

        .chat-input-field:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input-buttons {
          position: absolute;
          right: 12px;
          display: flex;
          gap: 4px;
        }

        .input-button {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #4b5563;
          background-color: #374151;
          color: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }

        .input-button:hover:not(.disabled) {
          background-color: #4b5563;
        }

        .input-button.primary {
          background-color: #6b7280;
          border-color: #6b7280;
        }

        .input-button.primary:hover:not(.disabled) {
          background-color: #7f8a96;
        }

        .input-button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input-button svg {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </>
  );
};
