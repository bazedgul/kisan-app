import mongoose from 'mongoose';

const fertilizerSchema = new mongoose.Schema({

  name: {
    ur: String,
    sd: String,
    en: String
  },
  brand: String,
  pricePerBag: Number,
  usage: String,
  imageUrl: String,
  approved: {
  type: Boolean,
  default: false
}

  
}, { timestamps: true });

export default mongoose.model('Fertilizer', fertilizerSchema);
