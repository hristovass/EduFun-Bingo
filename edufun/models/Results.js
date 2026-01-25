const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    username: { type: String, required: true },
    category: { type: String, required: true },
    score: { type: Number, required: true },
}, { timestamps: true });

const Result = mongoose.model('Results', resultSchema);

module.exports = Result;
