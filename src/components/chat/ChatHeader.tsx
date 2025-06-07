
import React from 'react';
import { Settings } from 'lucide-react';
import { ModelSelector } from './ModelSelector';
import { SearchModalTrigger } from '@/components/search/SearchModalTrigger';

interface ChatHeaderProps {
  isNewChat: boolean;
  chatTitle?: string;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
  selectedModel: string;
  setSelectedModel: (modelId: string) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isNewChat,
  chatTitle,
  advancedMode,
  setAdvancedMode,
  selectedModel,
  setSelectedModel
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      borderBottom: '1px solid #4b5563',
      backgroundColor: '#1f2937'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#f9fafb',
            margin: 0
          }}>
            {isNewChat ? 'New Chat' : chatTitle || 'Chat'}
          </h1>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#9ca3af'
          }}>
            Model:
          </span>
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            className="min-w-[200px]"
          />
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <SearchModalTrigger />
        
        {setAdvancedMode && (
          <button
            onClick={() => setAdvancedMode?.(!advancedMode)}
            style={{
              height: '32px',
              padding: '0 12px',
              backgroundColor: advancedMode ? '#6b7280' : '#374151',
              border: '1px solid #4b5563',
              borderRadius: '6px',
              color: '#f9fafb',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              if (!advancedMode) {
                e.currentTarget.style.backgroundColor = '#6b7280';
              }
            }}
            onMouseLeave={(e) => {
              if (!advancedMode) {
                e.currentTarget.style.backgroundColor = '#374151';
              }
            }}
          >
            <Settings style={{ width: '16px', height: '16px' }} />
            <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>
              Advanced
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
