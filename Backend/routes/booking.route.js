import express from 'express';
import { createBooking, getAllBookings, updateBookingStatus, getDealerBooking, downloadBookingPdf,payForBooking ,uploadPaymentReceipt } from '../controllers/booking.controller.js';
import { protect, isDealer, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Dealer books tractor
router.post('/', protect, isDealer, createBooking);

// Admin views all bookings
router.get('/', protect, isAdmin, getAllBookings);

// Admin updates status
router.put('/:bookingId/status', protect, isAdmin, updateBookingStatus);

// Dealer gets a single booking
router.get('/:bookingId', protect, isDealer, getDealerBooking);
router.get('/:id/pdf', protect, downloadBookingPdf);
import { upload } from '../middlewares/upload.js';

router.post('/:id/upload-receipt', protect, isDealer, upload.single('receipt'), uploadPaymentReceipt);
// Dealer updates payment status
router.put('/:id/pay', protect, isDealer, payForBooking);




export default router;
