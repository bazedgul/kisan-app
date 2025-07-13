import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.location = req.body.location || user.location;
  user.language = req.body.language || user.language;
  if (req.file) user.profileImage = `/uploads/${req.file.filename}`;

  await user.save();

  res.status(200).json({ message: 'Profile updated successfully', user });
};
