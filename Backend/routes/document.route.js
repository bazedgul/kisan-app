import express from 'express';
import { uploadDocument } from '../controllers/document.controller.js';
import { protect, isDealer } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.post('/upload', protect, isDealer, upload.single('file'), uploadDocument);

export default router;
