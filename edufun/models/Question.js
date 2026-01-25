const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [answerSchema]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
