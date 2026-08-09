const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  category_id: { type: String, required: true },
  correct: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { timestamps: true });

schema.index({ user: 1, category_id: 1 }, { unique: true });

module.exports = mongoose.models.BingoStat || mongoose.model('BingoStat', schema);
