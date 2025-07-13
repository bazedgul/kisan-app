import mongoose from 'mongoose';

const seedSchema = new mongoose.Schema({
  name: {
    ur: { type: String },
    sd: { type: String },
    en: { type: String },
  },
  cropType: String,
  pricePerBag: Number,
  quantityAvailable: Number,
  dealerName: String,
  contact: String,
  location: String,
  imageUrl: String,
  approved: {
  type: Boolean,
  default: false
}

}, { timestamps: true });

export default mongoose.model('Seed', seedSchema);
