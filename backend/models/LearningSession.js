import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const learningSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    pdfName: {
      type: String
    },

    // PDF is OPTIONAL
    pdfPath: {
      type: String,
      default: null
    },

    // THIS is the most important thing
    extractedText: {
      type: String,
      required: true
    },

    summary: {
      type: String,
      default: ""
    },

    flashcards: {
      type: [flashcardSchema],
      default: []
    },

    quiz: {
      type: [quizSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("LearningSession", learningSessionSchema);
