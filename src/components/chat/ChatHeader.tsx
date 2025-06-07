
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #4b5563',
    backgroundColor: '#1a1a1a'
  };

  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#f9fafb'
  };

  const modelSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const modelLabelStyle = {
    fontSize: '14px',
    color: '#9ca3af'
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const advancedButtonStyle = {
    height: '32px',
    padding: '0 12px',
    backgroundColor: advancedMode ? '#374151' : 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: '#f9fafb',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const advancedButtonHoverStyle = {
    backgroundColor: '#374151'
  };

  const iconStyle = {
    width: '16px',
    height: '16px'
  };

  return (
    <div style={headerStyle}>
      <div style={leftSectionStyle}>
        <div>
          <h1 style={titleStyle}>
            {isNewChat ? 'New Chat' : chatTitle || 'Chat'}
          </h1>
        </div>
        
        {/* Model Selector */}
        <div style={modelSectionStyle}>
          <span style={modelLabelStyle}>Model:</span>
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            className="min-w-[200px]"
          />
        </div>
      </div>

      <div style={rightSectionStyle}>
        <SearchModalTrigger />
        
        {setAdvancedMode && (
          <button
            style={advancedButtonStyle}
            onClick={() => setAdvancedMode?.(!advancedMode)}
            onMouseEnter={(e) => {
              if (!advancedMode) {
                Object.assign(e.currentTarget.style, advancedButtonHoverStyle);
              }
            }}
            onMouseLeave={(e) => {
              if (!advancedMode) {
                Object.assign(e.currentTarget.style, { ...advancedButtonStyle, backgroundColor: 'transparent' });
              }
            }}
          >
            <Settings style={iconStyle} />
            <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>Advanced</span>
          </button>
        )}
      </div>
    </div>
  );
};
