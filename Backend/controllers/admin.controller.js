import User from '../models/user.model.js';
import Seed from '../models/seed.model.js';
import Tractor from '../models/tractor.model.js';
import Fertilizer from '../models/fertilizer.model.js';
import Mandi from '../models/mandi.model.js';
import Log from '../models/log.model.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalDealers = await User.countDocuments({ role: 'dealer' });
    const pendingSeeds = await Seed.countDocuments({ approved: false });
    const pendingTractors = await Tractor.countDocuments({ approved: false });
    const pendingFertilizers = await Fertilizer.countDocuments({ approved: false });
    const totalMandiRates = await Mandi.countDocuments();
    const totalLogs = await Log.countDocuments();

    res.status(200).json({
      totalDealers,
      pendingSeeds,
      pendingTractors,
      pendingFertilizers,
      totalMandiRates,
      totalLogs
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
};
