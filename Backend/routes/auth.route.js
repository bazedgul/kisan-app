import express from 'express';
import { registerDealer, loginDealer } from '../controllers/auth.controller.js';

import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/register', apiLimiter, registerDealer);
router.post('/login', apiLimiter, loginDealer);

export default router;
