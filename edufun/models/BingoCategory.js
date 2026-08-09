const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  legacyId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.BingoCategory || mongoose.model('BingoCategory', schema);
