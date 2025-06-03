
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Upload, Settings } from 'lucide-react';

export const TrainModelSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <Card className="w-80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Train Your Own Model
              <Badge variant="secondary">Coming Soon</Badge>
            </CardTitle>
            <CardDescription>
              Create and train custom AI models tailored to your specific needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                <Upload className="w-4 h-4 mr-2" />
                Upload Training Data
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Settings className="w-4 h-4 mr-2" />
                Configure Model
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Brain className="w-4 h-4 mr-2" />
                Start Training
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              This feature is currently under development. Stay tuned for updates!
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(false)}
              className="w-full"
            >
              Minimize
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsExpanded(true)}
          className="rounded-full shadow-lg"
          size="icon"
        >
          <Brain className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
