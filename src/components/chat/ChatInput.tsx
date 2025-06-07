
import React, { useState, useEffect, useRef } from 'react';
import { Wand2, ArrowUp, Mic, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { QuickAssistanceModal } from '@/components/chat/QuickAssistanceModal';
import { SearchModal } from '@/components/search/SearchModal';

interface ChatInputProps {
  onSendMessage: (message: string, temperature?: number, length?: number) => void;
  placeholder?: string;
  disabled?: boolean;
  advancedMode?: boolean;
  temperature?: number;
  setTemperature?: (value: number) => void;
  length?: number;
  setLength?: (value: number) => void;
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
      onSendMessage(message, temperature, length);
      setMessage('');
    }
  };

  const handleInsertSearchResults = (results: string) => {
    setMessage(prev => prev + (prev ? '\n\n' : '') + results);
  };

  const containerStyle = {
    position: 'relative' as const,
    maxWidth: '768px',
    margin: '0 auto',
    width: '100%',
    padding: '16px 16px 32px 16px'
  };

  const formStyle = {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center'
  };

  const iconStyle = {
    position: 'absolute' as const,
    left: '12px',
    color: '#9ca3af',
    width: '20px',
    height: '20px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 44px',
    paddingRight: '128px',
    backgroundColor: '#374151',
    borderRadius: '8px',
    border: '1px solid #4b5563',
    color: '#f9fafb',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease'
  };

  const inputFocusStyle = {
    borderColor: '#6b7280',
    boxShadow: '0 0 0 2px rgba(107, 114, 128, 0.2)'
  };

  const inputDisabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed'
  };

  const buttonsContainerStyle = {
    position: 'absolute' as const,
    right: '12px',
    display: 'flex',
    gap: '4px'
  };

  const buttonStyle = {
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
    transition: 'all 0.2s ease'
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6b7280',
    borderColor: '#6b7280'
  };

  const submitButtonHoverStyle = {
    backgroundColor: '#7f8a96'
  };

  const buttonHoverStyle = {
    backgroundColor: '#4b5563'
  };

  const submitButtonDisabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed'
  };

  const buttonIconStyle = {
    width: '16px',
    height: '16px'
  };

  return (
    <>
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={iconStyle}>
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
              ...inputStyle,
              ...(disabled ? inputDisabledStyle : {}),
            }}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <div style={buttonsContainerStyle}>
            <button
              type="submit"
              style={{
                ...submitButtonStyle,
                ...((!message.trim() || disabled) ? submitButtonDisabledStyle : {})
              }}
              disabled={!message.trim() || disabled}
              onMouseEnter={(e) => {
                if (message.trim() && !disabled) {
                  Object.assign(e.currentTarget.style, submitButtonHoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, submitButtonStyle);
              }}
            >
              <ArrowUp style={buttonIconStyle} />
            </button>
            <button
              type="button"
              style={buttonStyle}
              onClick={() => setShowSearch(true)}
              title="Web Search"
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
            >
              <Search style={buttonIconStyle} />
            </button>
            <button
              type="button"
              style={buttonStyle}
              onClick={() => setShowQuickAssistance(true)}
              title="Quick Assistance"
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
            >
              <HelpCircle style={buttonIconStyle} />
            </button>
            <button
              type="button"
              style={{
                ...buttonStyle,
                ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {})
              }}
              disabled={disabled}
              title="Voice Input"
              onMouseEnter={(e) => {
                if (!disabled) {
                  Object.assign(e.currentTarget.style, buttonHoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, buttonStyle);
              }}
            >
              <Mic style={buttonIconStyle} />
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
