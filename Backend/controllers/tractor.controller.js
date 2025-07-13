import Tractor from "../models/tractor.model.js";

export const getAllTractors = async (req, res) => {
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
    const tractors = await Tractor.find(filter).skip(skip).limit(limit);
    const total = await Tractor.countDocuments(filter);

    res.status(200).json({
      data: tractors,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load tractors' });
  }
};


export const createTractor = async (req, res) => {
  try {
    const newData = new Tractor(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

export const getTractorById = async (req, res) => {
  try {
    const data = await Tractor.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error loading tractor service" });
  }
};

export const updateTractorById = async (req, res) => {
  try {
    const updatedData = await Tractor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: "Error updating tractor service" });
  }
};

export const deleteTractorById = async (req, res) => {
  try {
    await Tractor.findByIdAndDelete(req.params.id);
    res.json({ message: "Tractor service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tractor service" });
  }
};

export const approveTractor = async (req, res) => {
  try {
    const tractor = await Tractor.findById(req.params.id);
    if (!tractor) return res.status(404).json({ message: "Not found" });

    tractor.approved = true;
    await tractor.save();

    await logActivity(req, "Approved Tractor", tractor.serviceType);

    res.status(200).json({ message: "Tractor approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error approving tractor service" });
  }
};
