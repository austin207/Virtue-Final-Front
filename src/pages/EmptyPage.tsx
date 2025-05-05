
import React from 'react';

export const EmptyPage: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">This page is coming soon</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This section is currently under development. Please check back later.
        </p>
      </div>
    </div>
  );
};
