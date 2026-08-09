const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  legacyId: { type: String, required: true, unique: true, index: true },
  age_group: { type: String, required: true },
  min_age: Number,
  max_age: Number
}, { timestamps: true });

module.exports = mongoose.models.BingoAgeGroup || mongoose.model('BingoAgeGroup', schema);
