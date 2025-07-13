import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';
import { apiLimiter } from '../middlewares/rateLimiter.js'; // ✅ Import limiter

const router = express.Router();

router.post('/send-otp', apiLimiter, sendOTP); // ✅ Limiter added
router.post('/verify-otp', verifyOTP); // No limiter needed here usually

export default router;
