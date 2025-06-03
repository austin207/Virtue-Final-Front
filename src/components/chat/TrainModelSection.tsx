
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Upload, Play, Square, FileText, Database, ChevronUp, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const TrainModelSection: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelName, setModelName] = useState('');
  const [trainingData, setTrainingData] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Train Your Own Model</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>

      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="space-y-3 pt-2">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Create and train custom AI models with your data
          </p>

          <div className="space-y-2">
            <Label htmlFor="model-name" className="text-xs">Model Name</Label>
            <Input
              id="model-name"
              placeholder="My Custom Model"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              disabled={isTraining}
              className="h-8 text-xs"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Training Data</Label>
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
                className="flex-1 flex items-center justify-center gap-2 h-7 px-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs"
              >
                <Upload className="h-3 w-3" />
                Upload
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTrainingData('')}
                disabled={isTraining}
                className="h-7 px-2"
              >
                <FileText className="h-3 w-3" />
              </Button>
            </div>
            <Textarea
              placeholder="Or paste your training data here..."
              value={trainingData}
              onChange={(e) => setTrainingData(e.target.value)}
              rows={2}
              disabled={isTraining}
              className="text-xs resize-none"
            />
          </div>

          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Training Progress</span>
                <span>{Math.round(trainingProgress)}%</span>
              </div>
              <Progress value={trainingProgress} className="w-full h-2" />
            </div>
          )}

          <div className="flex gap-2">
            {!isTraining ? (
              <Button onClick={handleStartTraining} className="flex-1 h-7 text-xs" size="sm">
                <Play className="h-3 w-3 mr-1" />
                Start Training
              </Button>
            ) : (
              <Button onClick={handleStopTraining} variant="destructive" className="flex-1 h-7 text-xs" size="sm">
                <Square className="h-3 w-3 mr-1" />
                Stop Training
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded text-center">
            <strong>Note:</strong> Placeholder interface. Full training functionality coming soon.
          </div>
        </div>
      </div>
    </div>
  );
};
