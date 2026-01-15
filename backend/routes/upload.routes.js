import express from "express";
import protect from "../middleware/auth.middleware.js";
import { uploadPdf } from "../controllers/upload.controller.js";
import upload from "../middleware/upload.middleware.js";


const router = express.Router();

router.post("/pdf", protect, upload.single("pdf"), uploadPdf);

export default router;

