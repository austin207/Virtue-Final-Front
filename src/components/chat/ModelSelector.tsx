
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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
    <div className={`w-full ${className}`}>
      <div className="model-selector-container">
        <div className="model-tabs">
          <button
            type="button"
            className={`model-tab ${activeTab === 'my-models' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-models')}
          >
            My Models
          </button>
          <button
            type="button"
            className={`model-tab ${activeTab === 'performance-models' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance-models')}
          >
            Performance Models
          </button>
        </div>
        
        {activeTab === 'my-models' && (
          <div className="model-content">
            <Select value={selectedModel} onValueChange={handleModelSelect}>
              <SelectTrigger className="model-select-trigger">
                <SelectValue placeholder="Select Model">
                  {selectedModelData && selectedModelData.type === 'local' && (
                    <div className="model-value">
                      <span className="model-badge">LOCAL</span>
                      <span>{selectedModelData.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="model-select-content">
                {MY_MODELS.map(model => (
                  <SelectItem 
                    key={model.id} 
                    value={model.id}
                    className="model-select-item"
                  >
                    <div className="model-option">
                      <span className="model-badge">LOCAL</span>
                      <div className="model-info">
                        <span className="model-name">{model.name}</span>
                        <span className="model-desc">{model.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {activeTab === 'performance-models' && (
          <div className="model-content">
            <Select value={selectedModel} onValueChange={handleModelSelect}>
              <SelectTrigger className="model-select-trigger">
                <SelectValue placeholder="Select Model">
                  {selectedModelData && selectedModelData.type === 'api' && (
                    <div className="model-value">
                      <span className="model-badge-outline">{selectedModelData.provider}</span>
                      <span>{selectedModelData.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="model-select-content">
                {PERFORMANCE_MODELS.map(model => (
                  <SelectItem 
                    key={model.id} 
                    value={model.id}
                    className="model-select-item"
                  >
                    <div className="model-option">
                      <span className="model-badge-outline">{model.provider}</span>
                      <div className="model-info">
                        <span className="model-name">{model.name}</span>
                        <span className="model-desc">{model.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <style>{`
        .model-selector-container {
          width: 100%;
        }

        .model-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          margin-bottom: 8px;
          height: 36px;
          background-color: #6b7280;
          border-radius: 6px;
          padding: 2px;
        }

        .model-tab {
          font-size: 12px;
          padding: 8px 12px;
          color: #d1d5db;
          background-color: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .model-tab.active {
          background-color: #7f8a96;
          color: #ffffff;
        }

        .model-content {
          margin-top: 8px;
        }

        .model-select-trigger {
          height: 40px;
          background-color: #374151 !important;
          border: 1px solid #4b5563 !important;
          border-radius: 6px;
          color: #f9fafb !important;
        }

        .model-select-content {
          background-color: #2d2d2d !important;
          border: 1px solid #4b5563 !important;
          border-radius: 6px;
        }

        .model-select-item {
          color: #f9fafb !important;
          padding: 8px 12px;
        }

        .model-select-item:hover {
          background-color: #374151 !important;
        }

        .model-value, .model-option {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .model-badge {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          background-color: #6b7280;
          color: #ffffff;
        }

        .model-badge-outline {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          background-color: transparent;
          border: 1px solid #6b7280;
          color: #f9fafb;
        }

        .model-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .model-name {
          font-weight: 500;
          font-size: 14px;
          color: #f9fafb;
        }

        .model-desc {
          font-size: 12px;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};
