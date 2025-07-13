import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/auth.route.js';
import otpRoutes from './routes/otp.route.js';
import seedRoutes from './routes/seed.route.js';
import mandiRoutes from './routes/mandi.route.js';
import tractorRoutes from './routes/tractor.route.js';
import uploadRoutes from './routes/upload.route.js';
import tractorRoutes from './routes/tractor.route.js';
import fertilizerRoutes from './routes/fertilizer.route.js';
import userRoutes from './routes/user.route.js';
import invoiceRoutes from './routes/invoice.route.js';
import adminRoutes from './routes/admin.route.js';
import langRoutes from './routes/lang.routes.js';
import documentRoutes from './routes/document.route.js';
import verificationRoutes from './routes/verification.route.js';
import messageRoutes from './routes/message.route.js';
import bookingRoutes from './routes/booking.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


// OTP/language Routes
app.use('/api/otp', otpRoutes); 
app.use('/api/lang', langRoutes);

// Mandi/seeds/tractor/fertilizer Routes
app.use('/api/seeds', seedRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/tractor', tractorRoutes);
app.use('/api/fertilizer', fertilizerRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);




// Upload Routes
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});