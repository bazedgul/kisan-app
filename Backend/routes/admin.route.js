import express from 'express';
import { getAdminStats } from '../controllers/admin.controller.js';
import { protect, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/dashboard', protect, isAdmin, getAdminStats);

export default router;
