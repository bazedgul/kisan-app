import express from 'express';
import { upload } from '../middlewares/upload.js';
import { protect, isDealer } from '../middlewares/auth.js';
import { sendWhatsApp } from '../utils/sendWhatsapp.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// ✅ Rate Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: 'Too many requests, try again later.'
});

// ✅ Upload Route
router.post(
  '/',
  limiter,
  protect,
  isDealer,
  upload.single('image'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // ✅ WHATSAPP NOTIFICATION HERE
    await sendWhatsApp(`Dealer ${req.user.name} uploaded an image: ${req.file.filename}`);
    await logActivity(req, 'Uploaded Image', 'Upload'); 
    await logActivity(req, 'Updated Profile', 'User');


    res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
  }
);

export default router;
