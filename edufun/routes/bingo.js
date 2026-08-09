const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('node:fs');
const path = require('node:path');
const User = require('../models/User');
const BingoAgeGroup = require('../models/BingoAgeGroup');
const BingoCategory = require('../models/BingoCategory');
const BingoQuestion = require('../models/BingoQuestion');
const BingoScore = require('../models/BingoScore');
const BingoStat = require('../models/BingoStat');

const router = express.Router();
const games = new Map();

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Prijava je obvezna.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'some_secret_key');
    const user = await User.findById(payload.id).select('username email');
    if (!user) return res.status(401).json({ error: 'Uporabnik ne obstaja.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Prijava je potekla. Prijavi se ponovno.' });
  }
};

const createBoard = () => {
  const board = Array.from({ length: 5 }, () => Array(5).fill(false));
  board[2][2] = true;
  return board;
};

const selectSquare = (board) => {
  const available = [];
  board.forEach((row, r) => row.forEach((selected, c) => { if (!selected) available.push([r, c]); }));
  return available.length ? available[Math.floor(Math.random() * available.length)] : null;
};

const hasBingo = (board) => {
  for (let i = 0; i < 5; i += 1) {
    if (board[i].every(Boolean)) return true;
    if (board.every(row => row[i])) return true;
  }
  return [0, 1, 2, 3, 4].every(i => board[i][i]) || [0, 1, 2, 3, 4].every(i => board[i][4 - i]);
};

router.use(authenticate);

router.get('/me', (req, res) => res.json({
  id: String(req.user._id),
  username: req.user.username,
  first_name: req.user.username,
  last_name: '',
  email: req.user.email
}));

router.get('/menu', async (_req, res, next) => {
  try {
    const [ageGroups, categories] = await Promise.all([
      BingoAgeGroup.find().sort({ min_age: 1 }).lean(),
      BingoCategory.find().sort({ name: 1 }).lean()
    ]);
    res.json({
      ageGroups: ageGroups.map(x => ({ id: x.legacyId, age_group: x.age_group, min_age: x.min_age, max_age: x.max_age })),
      categories: categories.map(x => ({ id: x.legacyId, name: x.name }))
    });
  } catch (error) { next(error); }
});

router.get('/lessons', async (_req, res, next) => {
  try {
    const lessons = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'lessons.json'), 'utf8'));
    const categories = await BingoCategory.find().lean();
    const normalize = value => String(value).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const lessonsById = { ...(lessons.lessonsById || {}) };
    for (const category of categories) {
      const lesson = lessons.lessonsByName?.[normalize(category.name)];
      if (lesson && !lessonsById[category.legacyId]) lessonsById[category.legacyId] = lesson;
    }
    res.json({ ...lessons, lessonsById });
  } catch (error) { next(error); }
});

router.get('/leaderboard', async (req, res, next) => {
  try {
    const groups = String(req.query.groups || '').split(',').filter(Boolean);
    const categories = String(req.query.categories || '').split(',').filter(Boolean);
    const filter = {};
    if (groups.length) filter.age_group_id = { $in: groups };
    if (categories.length) filter.category_id = { $in: categories };
    const scores = await BingoScore.find(filter).sort({ score: -1 }).lean();
    res.json(scores.map(item => ({
      id: item._id,
      score: item.score,
      created_at: item.createdAt,
      age_group_id: item.age_group_id,
      category_id: item.category_id,
      user_id: item.user || item.legacyUserId,
      User: { first_name: item.displayName, last_name: '' }
    })));
  } catch (error) { next(error); }
});

router.get('/score', async (req, res, next) => {
  try {
    const rows = await BingoScore.find({ user: req.user._id }).select('score').lean();
    res.json({ total: rows.reduce((sum, row) => sum + row.score, 0) });
  } catch (error) { next(error); }
});

router.get('/stats', async (req, res, next) => {
  try {
    const rows = await BingoStat.find({ user: req.user._id }).lean();
    res.json(Object.fromEntries(rows.map(row => [row.category_id, { correct: row.correct, total: row.total }])));
  } catch (error) { next(error); }
});

router.delete('/stats', async (req, res, next) => {
  try {
    await BingoStat.deleteMany({ user: req.user._id });
    res.json({ success: true });
  } catch (error) { next(error); }
});

router.post('/games', async (req, res, next) => {
  try {
    const group = String(req.body.group || '');
    const categories = (req.body.categories || []).map(String);
    if (!group || !categories.length) return res.status(400).json({ error: 'Izberi starostno skupino in predmet.' });
    const questions = await BingoQuestion.find({ age_group_id: group, category_id: { $in: categories } }).lean();
    const player = { id: 0, user_id: String(req.user._id), board: createBoard() };
    games.set(String(req.user._id), { group, categories, questions, players: [player] });
    res.json({
      questions: questions.map(q => ({ id: q.legacyId, text: q.text, options: q.answers, correct_answer: q.correct_answer, image_path: q.image_path, category_id: q.category_id, age_group_id: q.age_group_id })),
      players: [player]
    });
  } catch (error) { next(error); }
});

router.post('/games/answer', async (req, res, next) => {
  try {
    const game = games.get(String(req.user._id));
    if (!game) return res.status(400).json({ error: 'Igra ni aktivna.' });
    const player = game.players.find(item => item.id === Number(req.body.playerId));
    const question = game.questions.find(item => item.legacyId === String(req.body.questionId));
    if (!player || !question) return res.status(400).json({ error: 'Igralec ali vprašanje ni veljavno.' });
    if (hasBingo(player.board)) return res.json({ error: 'Igralec že ima bingo.', bingo: true, board: player.board });
    const correct = Number(question.correct_answer) === Number(req.body.selectedIndex);
    let bingo = false;
    await BingoStat.findOneAndUpdate(
      { user: req.user._id, category_id: question.category_id },
      { $inc: { total: 1, correct: correct ? 1 : 0 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (correct) {
      const position = selectSquare(player.board);
      if (position) player.board[position[0]][position[1]] = true;
      bingo = hasBingo(player.board);
      await BingoScore.findOneAndUpdate(
        { user: req.user._id, age_group_id: question.age_group_id, category_id: question.category_id },
        { $inc: { score: bingo ? 110 : 10 }, $set: { displayName: req.user.username } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    res.json({ correct, bingo, board: player.board });
  } catch (error) { next(error); }
});

router.use((error, _req, res, _next) => {
  console.error('Bingo API error:', error);
  res.status(500).json({ error: error.message || 'Napaka Bingo strežnika.' });
});

module.exports = router;
