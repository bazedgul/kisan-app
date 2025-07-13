import Booking from '../models/booking.model.js';
import { generateBookingPdf } from '../utils/generateBookingPdf.js';
import path from 'path';

// ✅ Dealer books a tractor
export const createBooking = async (req, res) => {
  const { type, tractor, seed, quantity, date, location, paymentMethod } = req.body;

  const booking = await Booking.create({
    dealer: req.user._id,
    type,
    tractor: type === 'tractor' ? tractor : null,
    seed: type === 'seed' ? seed : null,
    quantity,
    date,
    location,
    payment: {
      method: paymentMethod || 'cod'
    }
  });

  res.status(201).json({ message: 'Booking created', booking });

};

// ✅ Dealer pays for a booking
export const payForBooking = async (req, res) => {
  const { id } = req.params;
  const { method, receiptUrl } = req.body;

  const booking = await Booking.findById(id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  // Optional: Check if this booking belongs to the logged-in dealer
  if (booking.dealer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to pay for this booking' });
  }

  // ❌ Booking already marked as paid
  if (booking.payment.status === 'paid') {
    return res.status(400).json({ message: 'Booking already marked as paid' });
  }

  // ✅ Update payment
  booking.payment = {
    method: method || booking.payment.method || 'cod',
    status: 'pending', // Admin will later verify and mark as "paid"
    receiptUrl: receiptUrl || booking.payment.receiptUrl
  };

  await booking.save();

  res.status(200).json({ message: 'Payment submitted for review', booking });
};


// ✅ Dealer gets a single booking
export const getDealerBooking = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId)
    .populate('tractor', 'name price')
    .populate('seed', 'name price');

  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  res.status(200).json({ booking });
};



// ✅ Admin gets all bookings
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('dealer', 'name phone')
    .populate('tractor', 'name price');

  res.status(200).json({ count: bookings.length, bookings });
};

// ✅ Admin approves/rejects booking
export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  booking.status = status;
  await booking.save();

  res.status(200).json({ message: 'Booking status updated', booking });
};

export const uploadPaymentReceipt = async (req, res) => {
  const { id } = req.params;
  if (!req.file) return res.status(400).json({ message: 'No receipt uploaded' });

  const booking = await Booking.findById(id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  booking.payment.receiptUrl = `/uploads/${req.file.filename}`;
  await booking.save();

  res.status(200).json({ message: 'Payment receipt uploaded', receiptUrl: booking.payment.receiptUrl });
};



export const downloadBookingPdf = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id)
    .populate('tractor seed dealer', 'name');

  if (!booking) return res.status(404).json({ message: 'Not found' });

  const pdfPath = path.join('downloads', `booking-${id}.pdf`);
  await generateBookingPdf(booking, pdfPath);

  res.download(pdfPath);
};
