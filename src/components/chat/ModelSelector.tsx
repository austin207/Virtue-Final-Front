
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export interface Model {
  id: string;
  name: string;
  description: string;
  type: 'local' | 'api';
  provider?: string;
}

export const MY_MODELS: Model[] = [
  {
    id: 'virtue-v1',
    name: 'Virtue-V1',
    description: 'RNN-based language model',
    type: 'local'
  },
  {
    id: 'virtue-v2',
    name: 'Virtue-V2',
    description: 'Transformer-based language model',
    type: 'local'
  },
  {
    id: 'llama-transformer',
    name: 'LLama-based Transformer',
    description: 'LLama-powered transformer model',
    type: 'local'
  }
];

export const PERFORMANCE_MODELS: Model[] = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Fast and efficient OpenAI model',
    type: 'api',
    provider: 'openai'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Advanced OpenAI model',
    type: 'api',
    provider: 'openai'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s advanced AI model',
    type: 'api',
    provider: 'gemini'
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    description: 'Anthropic\'s fast model',
    type: 'api',
    provider: 'anthropic'
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(() => {
    const allModels = [...MY_MODELS, ...PERFORMANCE_MODELS];
    const selectedModelData = allModels.find(m => m.id === selectedModel);
    return selectedModelData?.type === 'local' ? 'my-models' : 'performance-models';
  });

  const allModels = [...MY_MODELS, ...PERFORMANCE_MODELS];
  const selectedModelData = allModels.find(m => m.id === selectedModel);

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId);
  };

  return (
    <div className={`w-full ${className}`} style={{ minWidth: '200px' }}>
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          marginBottom: '8px',
          height: '36px',
          backgroundColor: '#4b5563',
          borderRadius: '6px',
          padding: '2px'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('my-models')}
            style={{
              fontSize: '12px',
              padding: '8px 12px',
              color: activeTab === 'my-models' ? '#ffffff' : '#d1d5db',
              backgroundColor: activeTab === 'my-models' ? '#6b7280' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            My Models
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('performance-models')}
            style={{
              fontSize: '12px',
              padding: '8px 12px',
              color: activeTab === 'performance-models' ? '#ffffff' : '#d1d5db',
              backgroundColor: activeTab === 'performance-models' ? '#6b7280' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Performance Models
          </button>
        </div>
        
        {activeTab === 'my-models' && (
          <div style={{ marginTop: '8px' }}>
            <Select value={selectedModel} onValueChange={handleModelSelect}>
              <SelectTrigger style={{
                height: '40px',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '6px',
                color: '#f9fafb'
              }}>
                <SelectValue placeholder="Select Model">
                  {selectedModelData && selectedModelData.type === 'local' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#6b7280',
                        color: '#ffffff'
                      }}>
                        LOCAL
                      </span>
                      <span>{selectedModelData.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent style={{
                backgroundColor: '#2d3748',
                border: '1px solid #4b5563',
                borderRadius: '6px'
              }}>
                {MY_MODELS.map(model => (
                  <SelectItem 
                    key={model.id} 
                    value={model.id}
                    style={{
                      color: '#f9fafb',
                      padding: '8px 12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#6b7280',
                        color: '#ffffff'
                      }}>
                        LOCAL
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: '500', fontSize: '14px', color: '#f9fafb' }}>
                          {model.name}
                        </span>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {model.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {activeTab === 'performance-models' && (
          <div style={{ marginTop: '8px' }}>
            <Select value={selectedModel} onValueChange={handleModelSelect}>
              <SelectTrigger style={{
                height: '40px',
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '6px',
                color: '#f9fafb'
              }}>
                <SelectValue placeholder="Select Model">
                  {selectedModelData && selectedModelData.type === 'api' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'transparent',
                        border: '1px solid #6b7280',
                        color: '#f9fafb'
                      }}>
                        {selectedModelData.provider}
                      </span>
                      <span>{selectedModelData.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent style={{
                backgroundColor: '#2d3748',
                border: '1px solid #4b5563',
                borderRadius: '6px'
              }}>
                {PERFORMANCE_MODELS.map(model => (
                  <SelectItem 
                    key={model.id} 
                    value={model.id}
                    style={{
                      color: '#f9fafb',
                      padding: '8px 12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'transparent',
                        border: '1px solid #6b7280',
                        color: '#f9fafb'
                      }}>
                        {model.provider}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: '500', fontSize: '14px', color: '#f9fafb' }}>
                          {model.name}
                        </span>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {model.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};
