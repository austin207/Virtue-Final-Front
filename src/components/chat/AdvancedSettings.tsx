
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
  top_K: number;
  setTopK: (value: number) => void;
  top_P: number;
  setTopP: (value: number) => void;
  repetition_penalty: number;
  setRepetitionPenalty: (value: number) => void;
  tokensPerSecond: number | null;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  temperature = 0,
  setTemperature = () => {},
  length = 50,
  setLength = () => {},
  top_K = 40,
  setTopK = () => {},
  top_P = 0.9,
  setTopP = () => {},
  repetition_penalty = 1.1,
  setRepetitionPenalty = () => {},
  tokensPerSecond = null
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
        <input
          type="range"
          id="temperature"
          min={0}
          max={2}
          step={0.1}
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="html-slider"
        />
        <p className="settings-description">
          Lower values produce more focused outputs, higher values are more creative.
        </p>
      </div>
      
      <div className="settings-group">
        <div className="settings-header">
          <Label htmlFor="length" className="settings-label">
            Max Length: {length}
          </Label>
        </div>
        <input
          type="range"
          id="length"
          min={50}
          max={4000}
          step={50}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="html-slider"
        />
        <p className="settings-description">
          Sets the maximum length of generated responses.
        </p>
      </div>
      <div className="settings-group">
        <div className="settings-header">
          <Label htmlFor="top_K" className="settings-label">
            Top K: {top_K}
          </Label>
        </div>
        <input
          type="range"
          id="top_K"
          min={5}
          max={200}
          step={1} 
          value={top_K}
          onChange={(e) => setTopK(Number(e.target.value))}
          className="html-slider"
        />
        <p className="settings-description">
          Sets the number of most probable tokens to sample from. Higher values increase diversity.
        </p>
      </div>
      <div className="settings-group">
        <div className="settings-header">
          <Label htmlFor="top_P" className="settings-label">
            Top P: {Number(top_P).toFixed(2)}
          </Label>
        </div>
        <input
          type="range"
          id="top_P"
          min={0.7}
          max={1.0}
          step={0.01} 
          value={top_P}
          onChange={(e) => setTopP(Number(e.target.value))}
          className="html-slider"
        />
        <p className="settings-description">
          Sets the number of most probable tokens to sample from. Higher values increase diversity.
        </p>
      </div>
      <div className="settings-group">
        <div className="settings-header">
          <Label htmlFor="repetition_penalty" className="settings-label">
            Repetition Penalty: {Number(repetition_penalty).toFixed(2)}
          </Label>
        </div>
        <input
          type="range"
          id="repetition_penalty"
          min={1.0}
          max={1.5}
          step={0.01} 
          value={repetition_penalty}
          onChange={(e) => setRepetitionPenalty(Number(e.target.value))}
          className="html-slider"
        />
        <p className="settings-description">
          Discourages repeating the same tokens. Higher values reduce repetition.
        </p>
      </div>
    </div>
  );
};
