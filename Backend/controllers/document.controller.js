import User from '../models/user.model.js';

export const uploadDocument = async (req, res) => {
  const { type } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  const user = await User.findById(req.user._id);

  user.documents.push({ fileUrl, type });
  await user.save();

  res.status(200).json({ message: 'Document uploaded successfully', fileUrl });
};
