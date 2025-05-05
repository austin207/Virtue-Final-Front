
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

export const generateText = async (
  request: GenerateTextRequest
): Promise<GenerateTextResponse> => {
  try {
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

    return await response.json();
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
};
