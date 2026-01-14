import { GoogleGenAI, Type } from "@google/genai";
import { Article } from "../types";
import { MOCK_ARTICLES } from "../constants";

// Helper function to get a random image that stays consistent for the same ID during the session
const getPlaceholderImage = (keyword: string) => `https://picsum.photos/seed/${keyword}/800/600`;

export const fetchLatestNews = async (): Promise<Article[]> => {
  const apiKey = process.env.API_KEY;

  // Fallback to mock data if no API Key is present (Simulating API failure or dev mode)
  if (!apiKey) {
    console.warn("API Key missing. Using Mock Data.");
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ARTICLES), 1000); // Simulate network delay
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Gere um array JSON com 8 notícias de cultura pop fictícias, mas altamente realistas e atuais. Cubra tópicos como Cinema, Séries, Games, Quadrinhos, Literatura e Tecnologia. Os títulos devem ser chamativos (clickbait moderado). As datas devem ser recentes.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Filmes', 'Séries', 'Games', 'Quadrinhos', 'Tecnologia', 'Literatura'] },
              author: { type: Type.STRING },
              publishedAt: { type: Type.STRING },
              imageKeyword: { type: Type.STRING, description: "A single english keyword to search for an image, e.g. 'robot', 'batman', 'computer'" }
            },
            required: ['id', 'title', 'excerpt', 'category', 'author', 'publishedAt', 'imageKeyword']
          }
        }
      }
    });

    const generatedText = response.text;
    if (!generatedText) throw new Error("No data returned from Gemini");

    const parsedData = JSON.parse(generatedText);

    // Map the response to add actual image URLs based on keywords
    const articles: Article[] = parsedData.map((item: any, index: number) => ({
      ...item,
      id: `gemini-${index}`,
      imageUrl: getPlaceholderImage(item.imageKeyword || 'popculture'),
      isFeatured: index === 0 // Make the first one featured
    }));

    return articles;

  } catch (error) {
    console.error("Failed to fetch from Gemini, falling back to mock:", error);
    return MOCK_ARTICLES;
  }
};