const bookingSchema = new mongoose.Schema({
  dealer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['tractor', 'seed'],
    required: true
  },
  tractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tractor'
  },
  seed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seed'
  },
  quantity: Number, // for seed order
  date: {
    type: Date,
    required: true
  },
  location: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  payment: {
  method: {
    type: String,
    enum: ['easypaisa', 'jazzcash', 'bank', 'cod', 'other'],
    default: 'cod'
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  receiptUrl: { type: String }
},

});
