import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import protect from "./middleware/auth.middleware.js";
import uploadRoutes from './routes/upload.routes.js'
import sessionRoutes from './routes/session.routes.js';
import aiRoutes from './routes/ai.routes.js'

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/sessions',sessionRoutes );
app.use("/api/ai", aiRoutes)




app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route", userId: req.userId });
});


// Test Route
app.get("/", (req, res) => {
  res.send("AI Learning Backend Running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
