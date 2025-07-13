import express from 'express';
import { sendMessage, getAllMessages } from '../controllers/message.controller.js';
import { protect, isDealer, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Dealer: Send message
router.post('/', protect, isDealer, sendMessage);

// Admin: View all messages
router.get('/', protect, isAdmin, getAllMessages);

export default router;
