import Message from '../models/message.model.js';

// Dealer sends a message
export const sendMessage = async (req, res) => {
  const { message } = req.body;

  const newMsg = await Message.create({
    sender: req.user._id,
    message
  });

  res.status(201).json({ message: 'Message sent successfully', data: newMsg });
};

// Admin fetches all messages
export const getAllMessages = async (req, res) => {
  const messages = await Message.find().populate('sender', 'name phone').sort({ createdAt: -1 });

  res.status(200).json({ count: messages.length, messages });
};
