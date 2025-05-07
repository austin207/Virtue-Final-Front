
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface AdvancedSettingsProps {
  temperature: number;
  setTemperature: (value: number) => void;
  length: number;
  setLength: (value: number) => void;
  tokensPerSecond: number | null;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  temperature,
  setTemperature,
  length,
  setLength,
  tokensPerSecond
}) => {
  return (
    <div className="fixed right-0 top-14 w-64 h-calc[100vh-56px] p-4 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-600 space-y-4 z-10">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="temperature" className="text-sm font-medium">
            Temperature: {temperature.toFixed(1)}
          </Label>
          {tokensPerSecond !== null && (
            <Badge variant="outline" className="text-xs">
              {tokensPerSecond.toFixed(1)} tokens/sec
            </Badge>
          )}
        </div>
        <Slider
          id="temperature"
          min={0}
          max={2}
          step={0.1}
          value={[temperature]}
          onValueChange={(values) => setTemperature(values[0])}
          className="w-full"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Lower values produce more focused outputs, higher values are more creative.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="length" className="text-sm font-medium">
          Max Length: {length}
        </Label>
        <Slider
          id="length"
          min={50}
          max={4000}
          step={50}
          value={[length]}
          onValueChange={(values) => setLength(values[0])}
          className="w-full"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Sets the maximum length of generated responses.
        </p>
      </div>
    </div>
  );
};
