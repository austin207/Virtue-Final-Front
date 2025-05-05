
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAssistanceModal: React.FC<QuickAssistanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">ChatGPT Quick Assistance</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <p className="text-center mb-1">Start by asking the question and let ChatGPT handle the rest.</p>
          <p className="text-center text-sm text-gray-500 mb-6">If you're unsure where to begin, take a look at our examples for inspiration.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-center mb-4 flex items-center justify-center">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-1 rounded mr-2">📚</span>
                Examples
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                  "Explain quantum computing in simple terms"→
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                  "Got any creative ideas for a 10 year old's birthday?"→
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                  "How do I make an HTTP request in JavaScript?"→
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-center mb-4 flex items-center justify-center">
                <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-1 rounded mr-2">⚡</span>
                Capabilities
              </h3>
              
              <div className="space-y-3 text-xs">
                <p className="text-gray-600 dark:text-gray-300">Remembers what user said earlier in the conversation</p>
                <p className="text-gray-600 dark:text-gray-300">Allows user to provide follow-up corrections</p>
                <p className="text-gray-600 dark:text-gray-300">Trained to decline inappropriate requests</p>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-center mb-4 flex items-center justify-center">
                <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-1 rounded mr-2">⚠️</span>
                Limitations
              </h3>
              
              <div className="space-y-3 text-xs">
                <p className="text-gray-600 dark:text-gray-300">May occasionally generate incorrect information</p>
                <p className="text-gray-600 dark:text-gray-300">May occasionally produce harmful instructions or biased content</p>
                <p className="text-gray-600 dark:text-gray-300">Limited knowledge of world and events after 2021</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="w-full md:w-1/2" onClick={onClose}>
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
