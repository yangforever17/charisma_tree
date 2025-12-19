import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLuxuryWish = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a very short, elegant, high-end Christmas greeting (max 15 words). The tone should be luxurious, magical, and sophisticated. Suitable for a premium jewelry or fashion brand context. Do not include quotes.",
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text?.trim() || "Elegance in every moment. Merry Christmas.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Golden moments, timeless memories.";
  }
};