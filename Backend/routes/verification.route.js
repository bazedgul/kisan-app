import express from 'express';
import { submitGPSLocation, verifyDealer } from '../controllers/verification.controller.js';
import { protect, isDealer, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/gps', protect, isDealer, submitGPSLocation);
router.put('/verify/:dealerId', protect, isAdmin, verifyDealer);

export default router;
