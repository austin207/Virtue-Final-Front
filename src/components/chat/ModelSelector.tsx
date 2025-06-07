
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

  const selectorStyle = {
    width: '100%',
    ...className && {}
  };

  const tabsListStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    marginBottom: '8px',
    height: '36px',
    backgroundColor: '#6b7280',
    borderRadius: '6px',
    padding: '2px'
  };

  const tabTriggerStyle = {
    fontSize: '12px',
    padding: '8px 12px',
    color: '#d1d5db',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const tabTriggerActiveStyle = {
    ...tabTriggerStyle,
    backgroundColor: '#7f8a96',
    color: '#ffffff'
  };

  const selectTriggerStyle = {
    height: '40px',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    color: '#f9fafb',
    padding: '0 12px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const selectContentStyle = {
    backgroundColor: '#2d2d2d',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    padding: '4px',
    zIndex: 1000
  };

  const selectItemStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#f9fafb',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease'
  };

  const badgeStyle = {
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: '#6b7280',
    color: '#ffffff',
    border: '1px solid #6b7280'
  };

  return (
    <div style={selectorStyle}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList style={tabsListStyle}>
          <TabsTrigger 
            value="my-models" 
            style={activeTab === 'my-models' ? tabTriggerActiveStyle : tabTriggerStyle}
          >
            My Models
          </TabsTrigger>
          <TabsTrigger 
            value="performance-models" 
            style={activeTab === 'performance-models' ? tabTriggerActiveStyle : tabTriggerStyle}
          >
            Performance Models
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-models" className="mt-0">
          <Select value={selectedModel} onValueChange={handleModelSelect}>
            <SelectTrigger style={selectTriggerStyle}>
              <SelectValue placeholder="Select Model">
                {selectedModelData && selectedModelData.type === 'local' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge style={badgeStyle}>LOCAL</Badge>
                    <span>{selectedModelData.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent style={selectContentStyle}>
              {MY_MODELS.map(model => (
                <SelectItem 
                  key={model.id} 
                  value={model.id}
                  style={selectItemStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge style={badgeStyle}>LOCAL</Badge>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>{model.name}</span>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{model.description}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TabsContent>
        
        <TabsContent value="performance-models" className="mt-0">
          <Select value={selectedModel} onValueChange={handleModelSelect}>
            <SelectTrigger style={selectTriggerStyle}>
              <SelectValue placeholder="Select Model">
                {selectedModelData && selectedModelData.type === 'api' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge style={{ ...badgeStyle, backgroundColor: 'transparent', border: '1px solid #6b7280' }}>
                      {selectedModelData.provider}
                    </Badge>
                    <span>{selectedModelData.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent style={selectContentStyle}>
              {PERFORMANCE_MODELS.map(model => (
                <SelectItem 
                  key={model.id} 
                  value={model.id}
                  style={selectItemStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge style={{ ...badgeStyle, backgroundColor: 'transparent', border: '1px solid #6b7280' }}>
                      {model.provider}
                    </Badge>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>{model.name}</span>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>{model.description}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TabsContent>
      </Tabs>
    </div>
  );
};
