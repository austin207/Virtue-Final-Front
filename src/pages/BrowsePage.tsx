
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { searchWeb, SearchResult } from '@/services/searchService';
import { useToast } from '@/hooks/use-toast';
import { fadeIn, scaleIn } from '@/utils/animationUtils';

export const BrowsePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchWeb(query);
      setResults(searchResults);
      toast({
        title: "Search Complete",
        description: `Found ${searchResults.length} results`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#343440]">
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-[#343440]">
        <h1 className="font-semibold">Browse</h1>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className={`max-w-3xl mx-auto ${fadeIn()}`}>
          <div className="bg-white dark:bg-[#343440] rounded-lg shadow p-6 mb-6 text-gray-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">Web Search</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search the web..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="transition-all duration-300"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
          
          {results.length > 0 && (
            <div className={`bg-white dark:bg-[#343440] rounded-lg shadow p-6 text-gray-800 dark:text-white ${scaleIn()}`}>
              <h3 className="text-lg font-semibold mb-4">Search Results</h3>
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className="border-b last:border-b-0 pb-4 last:pb-0" 
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <a 
                      href={result.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <h4 className="font-medium">{result.title}</h4>
                    </a>
                    <span className="text-green-600 dark:text-green-400 text-sm">{result.link}</span>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{result.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
