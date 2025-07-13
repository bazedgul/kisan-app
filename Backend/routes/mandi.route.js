import express from 'express';
import { createRate, getAllRates } from '../controllers/mandi.controller.js';
import { protect, isDealer } from '../middlewares/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validateMandi = [
  body('crop').notEmpty().withMessage('Crop name is required'),
  body('ratePer40kg').isNumeric().withMessage('Rate must be a number'),
  body('location').notEmpty().withMessage('Location is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.get('/', getAllRates);
router.post('/', protect, isDealer, validateMandi, createRate);

export default router;
