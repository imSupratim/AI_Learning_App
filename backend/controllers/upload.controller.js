import extractTextFromPDF from "../utils/pdfExtract.js";
import LearningSession from "../models/LearningSession.js";

export const uploadPdf = async (req, res) => {
  try {
    //check for the file
    if (!req.file) {
      return res.status(400).json({ message: "No Pdf uploaded" });
    }

    //extract text
    const extractedText = await extractTextFromPDF(req.file.path);

    if (!extractedText || extractedText.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Could not extract text from PDF" });
    }

    //create session
    const session = await LearningSession.create({
      userId: req.userId,
      pdfName: req.file.originalname,
      pdfPath: req.file.path, // optional
      extractedText,
    });

    // 4️⃣ Respond
    res.status(201).json({
      message: "PDF uploaded and session created",
      sessionId: session._id,
    });
  } catch (error) {
    console.error("Upload PDF error:", error.message);
    res.status(500).json({ message: "PDF upload failed" });
  }
};
