
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  name: string;
  key: string;
  provider: 'openai' | 'gemini' | 'anthropic';
}

export const ApiKeyManager: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKeys, setShowKeys] = useState<{[key: string]: boolean}>({});
  const [newKeys, setNewKeys] = useState({
    openai: '',
    gemini: '',
    anthropic: ''
  });
  const { toast } = useToast();

  // Load API keys from localStorage
  useEffect(() => {
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys));
      } catch (error) {
        console.error('Error loading API keys:', error);
      }
    }
  }, []);

  const saveApiKey = (provider: 'openai' | 'gemini' | 'anthropic') => {
    const key = newKeys[provider].trim();
    if (!key) {
      toast({
        title: 'Error',
        description: 'Please enter a valid API key',
        variant: 'destructive'
      });
      return;
    }

    const updatedKeys = [...apiKeys.filter(k => k.provider !== provider)];
    updatedKeys.push({
      name: provider.charAt(0).toUpperCase() + provider.slice(1),
      key,
      provider
    });

    setApiKeys(updatedKeys);
    localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));
    setNewKeys(prev => ({ ...prev, [provider]: '' }));
    
    toast({
      title: 'Success',
      description: `${provider.charAt(0).toUpperCase() + provider.slice(1)} API key saved successfully`
    });
  };

  const deleteApiKey = (provider: 'openai' | 'gemini' | 'anthropic') => {
    const updatedKeys = apiKeys.filter(k => k.provider !== provider);
    setApiKeys(updatedKeys);
    localStorage.setItem('apiKeys', JSON.stringify(updatedKeys));
    
    toast({
      title: 'Success',
      description: `${provider.charAt(0).toUpperCase() + provider.slice(1)} API key deleted`
    });
  };

  const toggleShowKey = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '*'.repeat(key.length);
    return key.slice(0, 4) + '*'.repeat(key.length - 8) + key.slice(-4);
  };

  const getExistingKey = (provider: 'openai' | 'gemini' | 'anthropic') => {
    return apiKeys.find(k => k.provider === provider);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
          <CardDescription>
            Manage your API keys for external AI services. Keys are stored locally and encrypted.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OpenAI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="openai-key" className="text-base font-medium">OpenAI API Key</Label>
              {getExistingKey('openai') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteApiKey('openai')}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {getExistingKey('openai') ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={showKeys.openai ? getExistingKey('openai')!.key : maskKey(getExistingKey('openai')!.key)}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleShowKey('openai')}
                >
                  {showKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={newKeys.openai}
                  onChange={(e) => setNewKeys(prev => ({ ...prev, openai: e.target.value }))}
                  className="flex-1"
                />
                <Button onClick={() => saveApiKey('openai')} size="sm">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Gemini */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="gemini-key" className="text-base font-medium">Gemini API Key</Label>
              {getExistingKey('gemini') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteApiKey('gemini')}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {getExistingKey('gemini') ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={showKeys.gemini ? getExistingKey('gemini')!.key : maskKey(getExistingKey('gemini')!.key)}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleShowKey('gemini')}
                >
                  {showKeys.gemini ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Input
                  id="gemini-key"
                  type="password"
                  placeholder="AIza..."
                  value={newKeys.gemini}
                  onChange={(e) => setNewKeys(prev => ({ ...prev, gemini: e.target.value }))}
                  className="flex-1"
                />
                <Button onClick={() => saveApiKey('gemini')} size="sm">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Anthropic */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="anthropic-key" className="text-base font-medium">Anthropic API Key</Label>
              {getExistingKey('anthropic') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteApiKey('anthropic')}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {getExistingKey('anthropic') ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={showKeys.anthropic ? getExistingKey('anthropic')!.key : maskKey(getExistingKey('anthropic')!.key)}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleShowKey('anthropic')}
                >
                  {showKeys.anthropic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-..."
                  value={newKeys.anthropic}
                  onChange={(e) => setNewKeys(prev => ({ ...prev, anthropic: e.target.value }))}
                  className="flex-1"
                />
                <Button onClick={() => saveApiKey('anthropic')} size="sm">
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
