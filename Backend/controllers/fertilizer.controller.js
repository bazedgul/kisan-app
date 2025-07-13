import Fertilizer from '../models/fertilizer.model.js';

export const getAllFertilizers = async (req, res) => {
  const { q, approved, minPrice, maxPrice } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (approved) filter.approved = approved === 'true';
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  try {
    const fertilizers = await Fertilizer.find(filter).skip(skip).limit(limit);
    const total = await Fertilizer.countDocuments(filter);

    res.status(200).json({
      data: fertilizers,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load fertilizers' });
  }
};

export const createFertilizer = async (req, res) => {
  try {
    const newData = new Fertilizer(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const getFertilizerById = async (req, res) => {
  try {
    const data = await Fertilizer.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error loading fertilizer' });
  }
};

export const updateFertilizerById = async (req, res) => {
  try {
    const updatedData = await Fertilizer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: 'Error updating fertilizer' });
  }
};

export const deleteFertilizerById = async (req, res) => {
  try {
    await Fertilizer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fertilizer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting fertilizer' });
  }
};

export const approveFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findById(req.params.id);
    if (!fertilizer) return res.status(404).json({ message: 'Not found' });

    fertilizer.approved = true;
    await fertilizer.save();

    res.status(200).json({ message: 'Fertilizer approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving fertilizer' });
  }
};