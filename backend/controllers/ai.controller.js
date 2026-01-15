import LearningSession from "../models/LearningSession.js";
import { generateFlashcards, generateSummary, generateQuiz } from "../utils/gemini.js";



export const generateSessionSummary = async (req, res) => {
  try {
    const session = await LearningSession.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Generate summary using extracted text
    const summary = await generateSummary(
      session.extractedText.slice(0, 12000)
    );

    session.summary = summary;
    await session.save();

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Summary generation error:", error.message);
    res.status(500).json({ message: "Failed to generate summary" });
  }
};




export const generateSessionFlashcards = async (req, res) => {
  try {
    const session = await LearningSession.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const aiResult = await generateFlashcards(
      session.extractedText.slice(0, 12000)
    );

    session.flashcards = aiResult.flashcards;
    await session.save();

    res.status(200).json({
      flashcards: session.flashcards,
    });
  } catch (error) {
    console.error("Flashcard generation error:", error.message);
    res.status(500).json({ message: "Failed to generate flashcards" });
  }
};


export const generateSessionQuiz = async (req, res) => {
  try {
    const session = await LearningSession.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const quizResult = await generateQuiz(session.extractedText);

    session.quiz = quizResult.quiz;
    await session.save();

    res.status(200).json({
      message: "Quiz generated",
      quiz: session.quiz
    });
  } catch (error) {
    console.error("Quiz generation error:", error.message);
    res.status(500).json({ message: "Failed to generate quiz" });
  }
};