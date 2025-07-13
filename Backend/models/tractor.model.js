import mongoose from 'mongoose';

const tractorSchema = new mongoose.Schema({
  serviceType: String,         // e.g., "Ploughing", "Spraying"
  pricePerAcre: Number,
  location: String,
  contactName: String,
  phone: String,
  imageUrl: String,
  approved: {
  type: Boolean,
  default: false
}

}, { timestamps: true });

export default mongoose.model('Tractor', tractorSchema);
