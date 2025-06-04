
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-2 h-9 bg-gray-600 dark:bg-gray-700">
          <TabsTrigger 
            value="my-models" 
            className="text-xs py-2 px-3 text-gray-300 data-[state=active]:bg-gray-500 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
          >
            My Models
          </TabsTrigger>
          <TabsTrigger 
            value="performance-models" 
            className="text-xs py-2 px-3 text-gray-300 data-[state=active]:bg-gray-500 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
          >
            Performance Models
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-models" className="mt-0">
          <Select value={selectedModel} onValueChange={handleModelSelect}>
            <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400">
              <SelectValue placeholder="Select Model">
                {selectedModelData && selectedModelData.type === 'local' && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-gray-500 text-white dark:bg-gray-600 dark:text-white">LOCAL</Badge>
                    <span className="text-sm">{selectedModelData.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              {MY_MODELS.map(model => (
                <SelectItem 
                  key={model.id} 
                  value={model.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-gray-500 text-white dark:bg-gray-600 dark:text-white">LOCAL</Badge>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{model.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{model.description}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TabsContent>
        
        <TabsContent value="performance-models" className="mt-0">
          <Select value={selectedModel} onValueChange={handleModelSelect}>
            <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400">
              <SelectValue placeholder="Select Model">
                {selectedModelData && selectedModelData.type === 'api' && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-gray-400 text-gray-600 dark:border-gray-500 dark:text-gray-400">
                      {selectedModelData.provider}
                    </Badge>
                    <span className="text-sm">{selectedModelData.name}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              {PERFORMANCE_MODELS.map(model => (
                <SelectItem 
                  key={model.id} 
                  value={model.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-gray-400 text-gray-600 dark:border-gray-500 dark:text-gray-400">
                      {model.provider}
                    </Badge>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{model.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{model.description}</span>
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
