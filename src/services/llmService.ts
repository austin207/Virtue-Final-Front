import { fetchEventSource } from "@microsoft/fetch-event-source";

/**
 * Service to interact with the custom LLM API (streaming version, with cache)
 */

interface GenerateTextRequest {
  prompt: string;
  length?: number;
  temperature?: number;
}

interface GenerateTextResponse {
  generated: string;
}

const API_URL = "http://localhost:8000"; // Change if needed

// Simple in-memory cache
const cache = new Map<string, { data: GenerateTextResponse, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// Create hash for request object to use as cache key
const hashRequest = (request: GenerateTextRequest): string => {
  return `${request.prompt}|${request.length}|${request.temperature}`;
};

/**
 * Streaming version: calls /generate-stream, streams tokens to onToken,
 * and returns the full response when done (and caches it).
 */
export const streamGenerateText = async (
  request: GenerateTextRequest,
  onToken: (token: string) => void
): Promise<GenerateTextResponse> => {
  const key = hashRequest(request);
  const cachedItem = cache.get(key);
  const now = Date.now();

  // Serve from cache if not expired
  if (cachedItem && (now - cachedItem.timestamp < CACHE_TTL)) {
    // Stream cached response char-by-char to onToken for UI consistency
    for (const char of cachedItem.data.generated) {
      onToken(char);
    }
    return cachedItem.data;
  }

  // Otherwise, stream from backend and build up the full response
  let fullResponse = request.prompt ?? "";
  await fetchEventSource(`${API_URL}/generate-stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    onmessage(ev) {
      if (ev.data) {
        fullResponse += ev.data;
        onToken(ev.data);
      }
    },
    onclose() {},
    onerror(err) {
      console.error("Streaming error:", err);
      throw err;
    },
  });

  // Cache the full response
  const data: GenerateTextResponse = { generated: fullResponse };
  cache.set(key, { data, timestamp: now });
  return data;
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
