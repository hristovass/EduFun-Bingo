const quizSchema = new mongoose.Schema({
    category: { type: String, required: true },
    questions: [{
      question: { type: String, required: true },
      correctAnswer: { type: String, required: true },
      answers: { type: [String], required: true }
    }]
  });
  
  const Quiz = mongoose.model('Quiz', quizSchema);
  
  app.post('/api/quiz/create', async (req, res) => {
    const { category, questions } = req.body;
  
    if (!category || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Category and questions are required' });
    }
  
    try {
      const newQuiz = new Quiz({ category, questions });
      await newQuiz.save();
      res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ message: 'Error saving quiz' });
    }
  });
  