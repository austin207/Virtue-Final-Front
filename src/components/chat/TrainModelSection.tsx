
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Play, Square, FileText, Database, Brain, Zap } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Jobs</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isTraining ? '1' : '0'}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sets</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Available for training</p>
          </CardContent>
        </Card>
      </div>

      {/* Training Form */}
      <Card>
        <CardHeader>
          <CardTitle>Train New Model</CardTitle>
          <CardDescription>
            Create and train a custom AI model with your own data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              placeholder="Enter a name for your model"
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
                className="flex-1 flex items-center justify-center gap-2 h-10 px-4 border border-input rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Training File
              </Label>
              <Button
                variant="outline"
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
              rows={6}
              disabled={isTraining}
              className="resize-none"
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
              <Button onClick={handleStartTraining} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Start Training
              </Button>
            ) : (
              <Button onClick={handleStopTraining} variant="destructive" className="flex-1">
                <Square className="h-4 w-4 mr-2" />
                Stop Training
              </Button>
            )}
          </div>

          <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
            <strong>Note:</strong> This is a placeholder interface. Full training functionality will be implemented with backend integration.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
