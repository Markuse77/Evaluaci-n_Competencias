import { GoogleGenAI } from "@google/genai";
import { EvaluationResult } from '../types.js';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini functionality will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const createPrompt = (evaluation: EvaluationResult[]): string => {
  const resultsText = evaluation
    .map(result => `- Comportamiento: "${result.behavior}"\n  - Puntuación: ${result.score} (${result.option.split('-')[1].trim()})\n  - Justificación del usuario: "${result.justification}"`)
    .join('\n\n');

  return `
    Eres un experto coach de Recursos Humanos proporcionando retroalimentación para una autoevaluación profesional.
    El usuario se ha evaluado en los siguientes comportamientos basados en su nivel de cargo y ha proporcionado una justificación para cada puntuación. La escala de puntuación es:
    0 - No demuestra la conducta
    1 - Eventualmente
    2 - Con frecuencia
    3 - Permanentemente

    Aquí están los resultados del usuario, incluyendo sus justificaciones:
    ${resultsText}

    Basado en estos resultados y, muy importante, en el contexto de sus justificaciones, por favor proporciona:
    1. **Una declaración de apertura positiva:** Reconoce su esfuerzo en la autorreflexión.
    2. **Fortalezas:** Identifica 2-3 comportamientos donde obtuvieron la puntuación más alta (2 o 3). Explica por qué estas son habilidades valiosas, **haciendo referencia a sus justificaciones** para personalizar el feedback.
    3. **Áreas de Desarrollo:** Identifica 2-3 comportamientos donde obtuvieron la puntuación más baja (0 o 1). Enmarca esto de manera constructiva, no negativa.
    4. **Sugerencias Accionables:** Para cada área de desarrollo, proporciona uno o dos pasos específicos y accionables que pueden tomar para mejorar, **utilizando el contexto de sus justificaciones** para que las sugerencias sean más relevantes.
    5. **Un comentario final de aliento.**

    Tu respuesta debe ser en español, profesional, alentadora y de apoyo. Formatea tu respuesta usando markdown para una clara legibilidad (títulos en negrita, listas con viñetas).
  `;
};

export const generateFeedback = async (evaluation: EvaluationResult[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("La funcionalidad de feedback por IA está deshabilitada porque la clave de API no está configurada.");
  }
  
  try {
    const prompt = createPrompt(evaluation);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocurrió un error al generar la retroalimentación. Por favor, inténtelo de nuevo más tarde.";
  }
};