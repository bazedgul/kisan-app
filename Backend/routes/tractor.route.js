import express from 'express';
import {
  getAllTractors,
  createTractor,
  getTractorById,
  updateTractorById,
  deleteTractorById,
  approveTractor
} from '../controllers/tractor.controller.js';

import { protect, isDealer, isAdmin } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

const validateTractor = [
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('pricePerAcre').isNumeric().withMessage('Price per acre must be a number'),
  body('location').notEmpty().withMessage('Location is required'),
  body('contactName').notEmpty().withMessage('Contact name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Public: anyone can view tractors
router.get('/', getAllTractors);
router.get('/:id', getTractorById);

// Protected: only dealers can create, update, delete
router.post('/', apiLimiter, protect, isDealer, validateTractor, createTractor);
router.put('/:id', apiLimiter, protect, isDealer, validateTractor, updateTractorById);
router.put('/approve/:id', protect, isAdmin, approveTractor);
router.delete('/:id', apiLimiter, protect, isDealer, deleteTractorById);

export default router;
