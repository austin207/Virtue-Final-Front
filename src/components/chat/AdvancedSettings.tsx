
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import './advancedSettings.css';

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
    <div className="advanced-settings-panel">
      <div className="settings-group">
        <div className="settings-header">
          <Label htmlFor="temperature" className="settings-label">
            Temperature: {temperature.toFixed(1)}
          </Label>
          {tokensPerSecond !== null && (
            <Badge variant="outline" className="tokens-badge">
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
          className="settings-slider"
        />
        <p className="settings-description">
          Lower values produce more focused outputs, higher values are more creative.
        </p>
      </div>
      
      <div className="settings-group">
        <Label htmlFor="length" className="settings-label">
          Max Length: {length}
        </Label>
        <Slider
          id="length"
          min={50}
          max={4000}
          step={50}
          value={[length]}
          onValueChange={(values) => setLength(values[0])}
          className="settings-slider"
        />
        <p className="settings-description">
          Sets the maximum length of generated responses.
        </p>
      </div>
    </div>
  );
};
