
import React from 'react';
import { TrainModelSection } from '@/components/chat/TrainModelSection';

export const TrainModelPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Train Your Own Model
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Create and train custom AI models with your data
        </p>
      </div>
      
      <div className="flex-1 p-6">
        <TrainModelSection />
      </div>
    </div>
  );
};

export default TrainModelPage;
