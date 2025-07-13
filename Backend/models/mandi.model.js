import mongoose from 'mongoose';

const mandiSchema = new mongoose.Schema({
  crop: String,
  location: String,
  ratePer40kg: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('MandiRate', mandiSchema);
