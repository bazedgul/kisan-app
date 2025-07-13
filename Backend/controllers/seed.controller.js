import Seed from '../models/seed.model.js';

// GET all seeds
export const getAllSeeds = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const { q, approved, lang, minPrice, maxPrice } = req.query;

  const filter = {};

  if (approved) filter.approved = approved === 'true';
  if (lang) filter['name.' + lang] = { $exists: true };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  if (q) {
    filter.$or = [
      { 'name.en': { $regex: q, $options: 'i' } },
      { 'name.ur': { $regex: q, $options: 'i' } },
      { 'name.sd': { $regex: q, $options: 'i' } }
    ];
  }

  try {
    const seeds = await Seed.find(filter).skip(skip).limit(limit);
    const total = await Seed.countDocuments(filter);

    res.status(200).json({
      data: seeds,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load seeds' });
  }
};



// GET single seed
export const getSeedById = async (req, res) => {
  try {
    const seed = await Seed.findById(req.params.id);
    if (!seed) return res.status(404).json({ message: 'Seed not found' });
    res.json(seed);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// CREATE seed
export const createSeed = async (req, res) => {
  try {
    const seed = new Seed(req.body);
    await seed.save();
    res.status(201).json(seed);
  } catch (error) {
    res.status(400).json({ message: 'Invalid seed data' });
  }
};

// UPDATE seed
export const updateSeed = async (req, res) => {
  try {
    const updated = await Seed.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};

// DELETE seed
export const deleteSeed = async (req, res) => {
  try {
    await Seed.findByIdAndDelete(req.params.id);
    res.json({ message: 'Seed deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

export const approveSeed = async (req, res) => {
  try {
    const seed = await Seed.findById(req.params.id);
    if (!seed) return res.status(404).json({ message: 'Not found' });

    seed.approved = true;
    await seed.save();

    await logActivity(req, 'Approved Seed', seed.name.en);

    res.status(200).json({ message: 'Seed approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving seed' });
  }
};
