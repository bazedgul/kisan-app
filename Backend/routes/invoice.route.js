import express from 'express';
import { generateInvoice } from '../controllers/invoice.controller.js';
import { protect, isDealer } from '../middlewares/auth.js';

const router = express.Router();

router.post('/generate', protect, isDealer, generateInvoice);

export default router;
