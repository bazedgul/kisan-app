import express from 'express';
import { registerDealer, loginDealer, resetPassword } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/register', apiLimiter, registerDealer);
router.post('/login', apiLimiter, loginDealer);
router.post('/reset-password', protect, resetPassword);

export default router;
