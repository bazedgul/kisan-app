import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// 🔒 Protect middleware: verify JWT
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// 🧑‍🌾 Allow only dealers
export const isDealer = (req, res, next) => {
  if (req.user?.role === 'dealer') {
    return next();
  }
  return res.status(403).json({ message: 'Dealer access required.' });
};

// 👨‍💼 Allow only admins
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required.' });
};


