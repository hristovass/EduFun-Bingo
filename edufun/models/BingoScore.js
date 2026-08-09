const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  legacyUserId: String,
  displayName: { type: String, required: true },
  age_group_id: { type: String, required: true, index: true },
  category_id: { type: String, required: true, index: true },
  score: { type: Number, default: 0 }
}, { timestamps: true });

schema.index(
  { user: 1, age_group_id: 1, category_id: 1 },
  {
    unique: true,
    partialFilterExpression: { user: { $type: 'objectId' } }
  }
);
schema.index({ legacyUserId: 1, age_group_id: 1, category_id: 1 });

module.exports = mongoose.models.BingoScore || mongoose.model('BingoScore', schema);
