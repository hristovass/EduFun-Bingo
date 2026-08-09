const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  legacyId: { type: String, required: true, unique: true, index: true },
  text: { type: String, required: true },
  answers: [{ type: String }],
  correct_answer: { type: Number, required: true },
  image_path: String,
  category_id: { type: String, required: true, index: true },
  age_group_id: { type: String, required: true, index: true }
}, { timestamps: true });

module.exports = mongoose.models.BingoQuestion || mongoose.model('BingoQuestion', schema);
