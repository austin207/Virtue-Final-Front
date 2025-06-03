
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Upload, Play, Pause, Square, FileText, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TrainModelSection: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelName, setModelName] = useState('');
  const [trainingData, setTrainingData] = useState('');
  const { toast } = useToast();

  const handleStartTraining = () => {
    if (!modelName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a model name',
        variant: 'destructive'
      });
      return;
    }

    if (!trainingData.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide training data',
        variant: 'destructive'
      });
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({
            title: 'Training Complete',
            description: `Model "${modelName}" has been successfully trained!`
          });
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 1000);

    toast({
      title: 'Training Started',
      description: `Training model "${modelName}"...`
    });
  };

  const handleStopTraining = () => {
    setIsTraining(false);
    setTrainingProgress(0);
    toast({
      title: 'Training Stopped',
      description: 'Model training has been stopped'
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTrainingData(content);
        toast({
          title: 'File Uploaded',
          description: `Successfully loaded ${file.name}`
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50">
      <Card className="shadow-lg border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Database className="h-5 w-5 text-blue-600" />
            Train Your Own Model
          </CardTitle>
          <CardDescription>
            Create and train custom AI models with your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              placeholder="My Custom Model"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              disabled={isTraining}
            />
          </div>

          <div className="space-y-2">
            <Label>Training Data</Label>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".txt,.csv,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isTraining}
              />
              <Label
                htmlFor="file-upload"
                className="flex-1 flex items-center justify-center gap-2 h-9 px-3 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload File
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTrainingData('')}
                disabled={isTraining}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Or paste your training data here..."
              value={trainingData}
              onChange={(e) => setTrainingData(e.target.value)}
              rows={3}
              disabled={isTraining}
            />
          </div>

          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>{Math.round(trainingProgress)}%</span>
              </div>
              <Progress value={trainingProgress} className="w-full" />
            </div>
          )}

          <div className="flex gap-2">
            {!isTraining ? (
              <Button onClick={handleStartTraining} className="flex-1" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Start Training
              </Button>
            ) : (
              <Button onClick={handleStopTraining} variant="destructive" className="flex-1" size="sm">
                <Square className="h-4 w-4 mr-2" />
                Stop Training
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">
            <strong>Note:</strong> This is a placeholder interface. Full training functionality will be implemented in the next phase.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
