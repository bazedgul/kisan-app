import User from '../models/user.model.js';

// Dealer saves GPS coordinates
export const submitGPSLocation = async (req, res) => {
  const { lat, lng } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'Dealer not found' });

  user.locationCoords = { lat, lng };
  await user.save();

  res.status(200).json({ message: 'GPS coordinates submitted successfully' });
};

// Admin verifies dealer manually
export const verifyDealer = async (req, res) => {
  const { dealerId } = req.params;

  const user = await User.findById(dealerId);
  if (!user) return res.status(404).json({ message: 'Dealer not found' });

  user.verified = true;
  await user.save();

  res.status(200).json({ message: 'Dealer verified successfully' });
};
