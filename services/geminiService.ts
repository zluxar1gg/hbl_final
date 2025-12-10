import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { MODELS } from "../constants";

// Initialize the Gemini client
// @ts-ignore: Assuming process.env is available via bundler/runtime
const apiKey = process.env.API_KEY || '';

// We create a factory/getter to ensure we pull the latest key if it changes (though usually static)
const getAI = () => new GoogleGenAI({ apiKey });

export const geminiService = {
  /**
   * Create a chat session
   */
  createChat: (): Chat => {
    const ai = getAI();
    return ai.chats.create({
      model: MODELS.CHAT,
      config: {
        systemInstruction: "You are a helpful, professional AI assistant. Be concise but thorough.",
      },
    });
  },

  /**
   * Analyze an image with text prompt
   */
  analyzeImage: async (base64Image: string, prompt: string, mimeType: string = 'image/jpeg'): Promise<string> => {
    const ai = getAI();
    
    // Clean base64 string if it includes data:image... prefix
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

    try {
      const response = await ai.models.generateContent({
        model: MODELS.VISION,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanBase64,
              },
            },
            {
              text: prompt || "Describe this image in detail.",
            },
          ],
        },
      });

      return response.text || "No analysis generated.";
    } catch (error) {
      console.error("Vision analysis failed:", error);
      throw error;
    }
  },

  /**
   * Generate an image from text using the flash-image model
   */
  generateImage: async (prompt: string): Promise<string> => {
    const ai = getAI();
    try {
        // Using the generateContent method for banana models as per guidelines
        const response = await ai.models.generateContent({
            model: MODELS.IMAGE,
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                }
            }
        });

        // Iterate through parts to find the image
        // The guidelines specify finding the inlineData part
        if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64EncodeString = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType || 'image/png';
                    return `data:${mimeType};base64,${base64EncodeString}`;
                }
            }
        }
        
        throw new Error("No image data found in response");
    } catch (error) {
        console.error("Image generation failed:", error);
        throw error;
    }
  }
};
