import express from 'express';
import { createSeed, getAllSeeds, getSeedById, updateSeed, deleteSeed } from '../controllers/seed.controller.js';
import { approveSeed } from '../controllers/seed.controller.js';
import { isAdmin } from '../middlewares/auth.js';
import { protect, isDealer } from '../middlewares/auth.js';
import { body, validationResult } from 'express-validator';



const router = express.Router();

// 🔍 Validation middleware
const validateSeed = [
  body('name.ur').notEmpty().withMessage('Name Urdu is required'),
  body('name.en').notEmpty().withMessage('Name English is required'),
  body('pricePerBag').isNumeric().withMessage('Price per bag must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.get('/', getAllSeeds);
router.get('/:id', getSeedById);
router.post('/', protect, isDealer, validateSeed, createSeed);
router.put('/approve/:id', protect, isAdmin, approveSeed);
router.put('/:id', protect, isDealer, validateSeed, updateSeed);
router.delete('/:id', protect, isDealer, deleteSeed);

export default router;
