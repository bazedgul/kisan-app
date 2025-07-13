import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get('/me', protect, getProfile);
router.put('/me', protect, upload.single('profileImage'), updateProfile);

export default router;
