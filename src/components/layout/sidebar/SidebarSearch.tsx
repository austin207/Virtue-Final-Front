
import React from 'react';
import { Search } from 'lucide-react';

export const SidebarSearch = () => {
  return (
    <div className="px-3 py-2">
      <div className="relative">
        <Search className="h-4 w-4 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-2 pl-10 pr-8 bg-gray-100 dark:bg-gray-800 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button className="absolute top-1/2 transform -translate-y-1/2 right-2">
          <div className="flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded">
            <span className="text-xs">≡</span>
          </div>
        </button>
      </div>
    </div>
  );
};
