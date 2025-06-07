
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
      <div style={{
        position: 'relative',
        maxWidth: '768px',
        margin: '0 auto',
        width: '100%',
        padding: '16px 16px 32px 16px'
      }}>
        <form onSubmit={handleSubmit} style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'absolute',
            left: '12px',
            color: '#9ca3af',
            width: '20px',
            height: '20px',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Wand2 />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              width: '100%',
              padding: '12px 12px 12px 44px',
              paddingRight: '140px',
              backgroundColor: '#374151',
              borderRadius: '8px',
              border: '1px solid #4b5563',
              color: '#f9fafb',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6b7280';
              e.target.style.boxShadow = '0 0 0 2px rgba(107, 114, 128, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#4b5563';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          <div style={{
            position: 'absolute',
            right: '12px',
            display: 'flex',
            gap: '4px'
          }}>
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #6b7280',
                backgroundColor: (!message.trim() || disabled) ? '#4b5563' : '#6b7280',
                color: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: (!message.trim() || disabled) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                padding: '0',
                opacity: (!message.trim() || disabled) ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!(!message.trim() || disabled)) {
                  e.currentTarget.style.backgroundColor = '#7f8a96';
                }
              }}
              onMouseLeave={(e) => {
                if (!(!message.trim() || disabled)) {
                  e.currentTarget.style.backgroundColor = '#6b7280';
                }
              }}
            >
              <ArrowUp style={{ width: '16px', height: '16px' }} />
            </button>
            
            <button
              type="button"
              onClick={() => setShowSearch(true)}
              title="Web Search"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #4b5563',
                backgroundColor: '#374151',
                color: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                padding: '0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}
            >
              <Search style={{ width: '16px', height: '16px' }} />
            </button>
            
            <button
              type="button"
              onClick={() => setShowQuickAssistance(true)}
              title="Quick Assistance"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #4b5563',
                backgroundColor: '#374151',
                color: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                padding: '0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}
            >
              <HelpCircle style={{ width: '16px', height: '16px' }} />
            </button>
            
            <button
              type="button"
              disabled={disabled}
              title="Voice Input"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #4b5563',
                backgroundColor: '#374151',
                color: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                padding: '0',
                opacity: disabled ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = '#4b5563';
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = '#374151';
                }
              }}
            >
              <Mic style={{ width: '16px', height: '16px' }} />
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
    </>
  );
};
