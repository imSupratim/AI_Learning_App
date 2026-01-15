import LearningSession from "../models/LearningSession.js";

//get all session of logged in user
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await LearningSession.find({ userId: req.userId })
      .select("_id pdfName createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Get sessions error:", error.message);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

//get single session by sessio id
export const getSessionById = async (req, res) => {
  try {
    const session = await LearningSession.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error("Get session error:", error.message);
    res.status(500).json({ message: "Failed to fetch session" });
  }
};


export const deleteSession = async (req, res) => {
  try {
    const session = await LearningSession.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await LearningSession.deleteOne({ _id: session._id });

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Delete session error:", error.message);
    res.status(500).json({ message: "Failed to delete session" });
  }
};
