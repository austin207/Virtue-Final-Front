
import { toast } from '@/hooks/use-toast';

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
}

export interface SearchResponse {
  results: SearchResult[];
  searchTerm: string;
  totalResults?: number;
}

class SearchService {
  private apiKey: string | null = null;

  constructor() {
    // Load API key from localStorage
    this.loadApiKey();
  }

  private loadApiKey() {
    const savedKey = localStorage.getItem('serpApiKey');
    this.apiKey = savedKey;
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('serpApiKey', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async search(query: string, numResults: number = 10): Promise<SearchResponse> {
    if (!this.apiKey) {
      throw new Error('SerpAPI key not configured. Please add it in settings.');
    }

    const url = new URL('https://serpapi.com/search');
    url.searchParams.append('engine', 'google');
    url.searchParams.append('q', query);
    url.searchParams.append('api_key', this.apiKey);
    url.searchParams.append('num', numResults.toString());

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const results: SearchResult[] = (data.organic_results || []).map((result: any, index: number) => ({
        title: result.title || 'No title',
        link: result.link || '#',
        snippet: result.snippet || 'No description available',
        position: index + 1
      }));

      return {
        results,
        searchTerm: query,
        totalResults: data.search_information?.total_results
      };
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  async quickSearch(query: string): Promise<string> {
    try {
      const response = await this.search(query, 5);
      
      if (response.results.length === 0) {
        return `No search results found for "${query}".`;
      }

      let summary = `Search results for "${query}":\n\n`;
      
      response.results.slice(0, 3).forEach((result, index) => {
        summary += `${index + 1}. **${result.title}**\n`;
        summary += `   ${result.snippet}\n`;
        summary += `   [Read more](${result.link})\n\n`;
      });

      return summary;
    } catch (error) {
      throw error;
    }
  }
}

export const searchService = new SearchService();

// Export a function for the BrowsePage to use
export const searchWeb = async (query: string): Promise<SearchResult[]> => {
  const response = await searchService.search(query);
  return response.results;
};
