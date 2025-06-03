
import { useState, useEffect } from 'react';

interface AdvancedSettings {
  temperature: number;
  length: number;
  top_K: number;
  top_P: number;
  repetition_penalty: number;
  selectedModel: string;
}

const DEFAULT_SETTINGS: AdvancedSettings = {
  temperature: 0.8,
  length: 150,
  top_K: 40,
  top_P: 0.9,
  repetition_penalty: 1.1,
  selectedModel: 'virtue-v2'
};

export const useAdvancedSettings = () => {
  const [settings, setSettings] = useState<AdvancedSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('advancedSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Failed to parse advanced settings:", error);
      }
    }
  }, []);

  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem('advancedSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AdvancedSettings>(
    key: K, 
    value: AdvancedSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    ...settings,
    updateSetting,
    setTemperature: (value: number) => updateSetting('temperature', value),
    setLength: (value: number) => updateSetting('length', value),
    setTopK: (value: number) => updateSetting('top_K', value),
    setTopP: (value: number) => updateSetting('top_P', value),
    setRepetitionPenalty: (value: number) => updateSetting('repetition_penalty', value),
    setSelectedModel: (value: string) => updateSetting('selectedModel', value),
  };
};
