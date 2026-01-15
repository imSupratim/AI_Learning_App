import express from 'express';
import protect from '../middleware/auth.middleware.js';
import { deleteSession, getAllSessions, getSessionById } from '../controllers/session.controller.js';


const router = express.Router();

router.get('/', protect, getAllSessions);
router.get('/:id', protect , getSessionById);
router.delete('/:id', protect, deleteSession);


export default router;
