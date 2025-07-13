import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new dealer
export const registerDealer = async (req, res) => {
  const { name, phone, password } = req.body;

  const exists = await User.findOne({ phone });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, phone, password: hashed });
  await user.save();

  res.status(201).json({ message: 'Dealer registered successfully' });
};

// Login dealer
export const loginDealer = async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role
    }
  });
};

