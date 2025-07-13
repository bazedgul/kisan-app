import OTP from '../models/otp.model.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Send OTP via WhatsApp
export const sendOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.deleteMany({ phone }); // remove old

  await OTP.create({
    phone,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60000)
  });

  try {
    await client.messages.create({
      body: `Your Kisan App login OTP is: ${otp}`,
      from: process.env.TWILIO_WHATSAPP,
      to: `whatsapp:${phone}`
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

// ✅ Verify OTP
export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  const existing = await OTP.findOne({ phone, otp });
  if (!existing || existing.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  await OTP.deleteMany({ phone }); // clear once used

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone, name: 'Kisan User', password: 'otp-login', role: 'dealer' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role
    }
  });
};
