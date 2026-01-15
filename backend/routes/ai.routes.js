import express from "express";
import protect from "../middleware/auth.middleware.js";
import { generateSessionSummary, generateSessionFlashcards, generateSessionQuiz } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/summary/:id", protect, generateSessionSummary);
router.post("/flashcards/:id", protect , generateSessionFlashcards);
router.post('/quiz/:id', protect, generateSessionQuiz);

export default router;
