
import { GoogleGenAI, Type } from "@google/genai";
import { FormData } from './types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to read file as base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

export const analyzeImageForMeasurements = async (imageFile: File): Promise<Partial<FormData['measurements']>> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please configure it to use the AI features.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Image = await fileToBase64(imageFile);

  const imagePart = {
    inlineData: {
      mimeType: imageFile.type,
      data: base64Image,
    },
  };

  const textPart = {
    text: `Analyze the person in this image and provide your best estimate for the following measurements.
    Provide your response as a valid JSON object.
    If a measurement cannot be determined, use null for its value.
    - "height": number (in cm)
    - "weight": number (in kg)
    - "skinColour": string
    - "bust": number (in inches)
    - "waist": number (in inches)
    - "hip": number (in inches)
    - "eyeColour": string
    - "hairColour": string`
  };
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          height: { type: Type.NUMBER },
          weight: { type: Type.NUMBER },
          skinColour: { type: Type.STRING },
          bust: { type: Type.NUMBER },
          waist: { type: Type.NUMBER },
          hip: { type: Type.NUMBER },
          eyeColour: { type: Type.STRING },
          hairColour: { type: Type.STRING },
        }
      }
    }
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as Partial<FormData['measurements']>;
  } catch(e) {
    console.error("Failed to parse JSON from Gemini:", jsonText);
    throw new Error("Failed to get structured data from analysis. The AI may have provided an invalid response.");
  }
};
