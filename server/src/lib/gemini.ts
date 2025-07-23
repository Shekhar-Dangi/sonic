import { GenerateContentResponse, GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function callGemini(
  text: string
): Promise<GenerateContentResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });
  return response;
}
