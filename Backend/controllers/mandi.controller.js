import MandiRate from '../models/mandi.model.js';

export const getAllRates = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const data = await Mandi.find({ approved: true }).skip(skip).limit(limit);
    const total = await Mandi.countDocuments({ approved: true });

    res.status(200).json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load mandi rates' });
  }
};

export const createRate = async (req, res) => {
  try {
    const newRate = new MandiRate(req.body);
    await newRate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json({ message: 'Invalid rate data' });
  }
};
