// models/log.model.js
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  action: String,
  resource: String,
  ip: String,
  time: { type: Date, default: Date.now }
});

export default mongoose.model('Log', logSchema);
