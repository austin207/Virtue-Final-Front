
import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { fadeIn } from '@/utils/animationUtils';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-chat-darker">
        <h1 className="font-semibold">Settings</h1>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-8">
            {/* Appearance */}
            <Card className={fadeIn()}>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme-mode" className="flex flex-col">
                      <span>Dark Mode</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Switch between light and dark themes
                      </span>
                    </Label>
                    <Switch 
                      id="theme-mode"
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label htmlFor="font-size">
                      Font Size
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        (Medium)
                      </span>
                    </Label>
                    <Slider
                      id="font-size"
                      defaultValue={[3]}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Settings */}
            <Card className={fadeIn(2)}>
              <CardHeader>
                <CardTitle>AI Settings</CardTitle>
                <CardDescription>Configure AI behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-history" className="flex flex-col">
                      <span>Remember Conversation History</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Allow AI to reference past conversations
                      </span>
                    </Label>
                    <Switch id="enable-history" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="web-search" className="flex flex-col">
                      <span>Enable Web Search</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Allow AI to search the web for information
                      </span>
                    </Label>
                    <Switch id="web-search" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Account & Privacy */}
            <Card className={fadeIn(3)}>
              <CardHeader>
                <CardTitle>Account & Privacy</CardTitle>
                <CardDescription>Manage your account settings and data privacy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-collection" className="flex flex-col">
                      <span>Data Collection</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Allow usage data collection for service improvement
                      </span>
                    </Label>
                    <Switch id="data-collection" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Delete All Data</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Remove all your chats and settings
                      </p>
                    </div>
                    <Button variant="destructive">Delete Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
