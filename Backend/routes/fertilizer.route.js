import express from 'express';
import { getAllFertilizers, createFertilizer, getFertilizerById, updateFertilizerById, deleteFertilizerById, approveFertilizer } from '../controllers/fertilizer.controller.js';
import { protect, isDealer, isAdmin } from '../middlewares/auth.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.get('/', getAllFertilizers);
router.post('/', createFertilizer);
router.get('/:id', getFertilizerById);
router.put('/:id', updateFertilizerById);
router.put('/approve/:id', protect, isAdmin, approveFertilizer);
router.delete('/:id', deleteFertilizerById);


export default router;
