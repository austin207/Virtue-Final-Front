
/**
 * Service to interact with the custom LLM API
 */

interface GenerateTextRequest {
  prompt: string;
  length?: number;
  temperature?: number;
}

interface GenerateTextResponse {
  generated: string;
}

const API_URL = "http://localhost:8000"; // Change this if your FastAPI is running on a different port

// Simple in-memory cache
const cache = new Map<string, {data: GenerateTextResponse, timestamp: number}>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// Create hash for request object to use as cache key
const hashRequest = (request: GenerateTextRequest): string => {
  return `${request.prompt}|${request.length}|${request.temperature}`;
};

export const generateText = async (
  request: GenerateTextRequest
): Promise<GenerateTextResponse> => {
  try {
    // Check cache first
    const key = hashRequest(request);
    const cachedItem = cache.get(key);
    const now = Date.now();
    
    if (cachedItem && (now - cachedItem.timestamp < CACHE_TTL)) {
      return cachedItem.data;
    }
    
    const response = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Store in cache
    cache.set(key, {
      data,
      timestamp: now
    });
    
    return data;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};

// Clean expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key);
    }
  }
}, CACHE_TTL);
