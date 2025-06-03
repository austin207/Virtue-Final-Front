
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, ExternalLink, Loader2 } from 'lucide-react';
import { searchService, SearchResult } from '@/services/searchService';
import { useToast } from '@/hooks/use-toast';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertResults?: (results: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onInsertResults
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [apiKey, setApiKey] = useState(searchService.getApiKey() || '');
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;

    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your SerpAPI key to search',
        variant: 'destructive'
      });
      return;
    }

    setIsSearching(true);
    try {
      searchService.setApiKey(apiKey);
      const response = await searchService.search(query, 8);
      setResults(response.results);
      
      toast({
        title: 'Search Complete',
        description: `Found ${response.results.length} results`
      });
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: 'Search Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleInsertResults = () => {
    if (results.length === 0 || !onInsertResults) return;

    let summary = `Search results for "${query}":\n\n`;
    
    results.slice(0, 5).forEach((result, index) => {
      summary += `${index + 1}. **${result.title}**\n`;
      summary += `   ${result.snippet}\n`;
      summary += `   [Read more](${result.link})\n\n`;
    });

    onInsertResults(summary);
    onClose();
    
    toast({
      title: 'Results Inserted',
      description: 'Search results have been added to your message'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Web Search
          </DialogTitle>
          <DialogDescription>
            Search the web and insert relevant results into your conversation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="serp-api-key">SerpAPI Key</Label>
            <Input
              id="serp-api-key"
              type="password"
              placeholder="Enter your SerpAPI key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Get your API key from{' '}
              <a
                href="https://serpapi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                serpapi.com
              </a>
            </p>
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter your search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Search Results</h3>
                {onInsertResults && (
                  <Button onClick={handleInsertResults} variant="outline" size="sm">
                    Insert Results
                  </Button>
                )}
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">
                          {result.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {result.snippet}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {result.link}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(result.link, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
