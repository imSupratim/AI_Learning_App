import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSummary = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-09-2025" });

  const prompt = `
                    Summarize the following content clearly for a student.
                    Use bullet points and simple language.

                    CONTENT:
                    ${text}
                    `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateFlashcards = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `
You are an AI tutor.

Generate flashcards strictly in VALID JSON.
Do NOT include markdown.
Do NOT include explanations.

Format EXACTLY like this:
{
  "flashcards": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}

CONTENT:
${text}
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // ⚠️ Important: parse JSON safely
  return JSON.parse(responseText);
};

export const generateQuiz = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `
            You are an AI tutor.

            Generate a quiz based on the content below.  
            Use multiple-choice questions (MCQs).  

            Rules:
            1. Output ONLY valid JSON.
            2. Do NOT include markdown or extra text.
            3. Each question must have 4 options and 1 correct answer.

            Format:
            {
            "quiz": [
                {
                "question": "string",
                "options": ["string","string","string","string"],
                "correctAnswer": "string"
                }
            ]
            }

            CONTENT:
            ${text}
            `;

  const result = await model.generateContent(prompt);
  let responseText = result.response.text();

  responseText = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(responseText);
};
