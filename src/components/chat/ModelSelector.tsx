
import React from 'react';
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
}

export const DEFAULT_MODELS: Model[] = [
  {
    id: 'virtue-v1',
    name: 'Virtue-V1',
    description: 'RNN-based language model'
  },
  {
    id: 'virtue-v2',
    name: 'Virtue-V2',
    description: 'Transformer-based language model'
  },
  {
    id: 'llama-transformer',
    name: 'LLama-based Transformer',
    description: 'LLama-powered transformer model'
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  models?: Model[];
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  models = DEFAULT_MODELS,
  className = ''
}) => {
  return (
    <Select
      value={selectedModel}
      onValueChange={onModelChange}
    >
      <SelectTrigger className={`h-8 ${className}`}>
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        {models.map(model => (
          <SelectItem key={model.id} value={model.id}>
            {model.name} ({model.description})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
