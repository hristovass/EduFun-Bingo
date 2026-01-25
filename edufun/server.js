require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'some_secret_key'; 


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const User = mongoose.model('User', userSchema);


const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  answers: { type: [String], required: true },
});

const Question = mongoose.model('Question', questionSchema);


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body; 

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/questions/:category', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category });
    console.log(questions);
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});
const Result = require('./models/Results');

app.post('/api/results', async (req, res) => {
  const { username, category, score } = req.body; 

  if (!username) {
      return res.status(400).json({ error: 'Username is required' });
  }

  const newResult = new Result({ username, category, score });
  try {
      await newResult.save();
      res.status(201).json(newResult);
  } catch (error) {
      console.error('Error saving result:', error);
      res.status(500).json({ error: 'Error saving result' });
  }
});

app.get('/api/results', async (req, res) => {
  const { username } = req.query;
  console.log('Fetching results for username:', username);

  try {
      const results = await Result.find({ username });
      console.log('Results found:', results);
      if (results.length === 0) {
          return res.status(404).json({ message: 'No results found for this user' });
      }
      res.json(results);
  } catch (error) {
      console.error('Error fetching results:', error);
      res.status(500).json({ message: 'Error fetching results' });
  }
});


const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
