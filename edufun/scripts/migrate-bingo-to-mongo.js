require('dotenv').config({ path: require('node:path').join(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const BingoAgeGroup = require('../models/BingoAgeGroup');
const BingoCategory = require('../models/BingoCategory');
const BingoQuestion = require('../models/BingoQuestion');
const BingoScore = require('../models/BingoScore');

const baseUrl = process.env.SUPABASE_URL;
const apiKey = process.env.SUPABASE_ANON_KEY;

async function readTable(table, select = '*') {
  const response = await fetch(`${baseUrl}/rest/v1/${encodeURIComponent(table)}?select=${encodeURIComponent(select)}`, {
    headers: { apikey: apiKey, Authorization: `Bearer ${apiKey}`, Range: '0-9999' }
  });
  if (!response.ok) throw new Error(`${table}: ${response.status} ${await response.text()}`);
  return response.json();
}

async function upsertAll(Model, rows) {
  if (!rows.length) return;
  await Model.bulkWrite(rows.map(row => ({
    updateOne: { filter: { legacyId: String(row.legacyId) }, update: { $set: row }, upsert: true }
  })));
}

async function migrate() {
  if (!process.env.MONGO_URI || !baseUrl || !apiKey) throw new Error('MONGO_URI, SUPABASE_URL and SUPABASE_ANON_KEY are required.');
  await mongoose.connect(process.env.MONGO_URI);
  const [ageGroups, categories, questions, legacyUsers, leaderboard] = await Promise.all([
    readTable('AgeGroups'), readTable('Category'), readTable('Questions'), readTable('User'), readTable('Leaderboard')
  ]);

  await upsertAll(BingoAgeGroup, ageGroups.map(row => ({
    legacyId: String(row.id), age_group: row.age_group, min_age: row.min_age, max_age: row.max_age
  })));
  await upsertAll(BingoCategory, categories.map(row => ({ legacyId: String(row.id), name: row.name })));
  await upsertAll(BingoQuestion, questions.map(row => ({
    legacyId: String(row.id), text: row.text, answers: row.answers || [],
    correct_answer: Number(row.correct_answer), image_path: row.image_path || null,
    category_id: String(row.category_id), age_group_id: String(row.age_group_id)
  })));

  // Older versions used a sparse unique index. MongoDB still indexes explicit
  // null values in sparse indexes, which made unrelated legacy users collide.
  await BingoScore.collection.dropIndex('user_1_age_group_id_1_category_id_1').catch(error => {
    if (error.codeName !== 'IndexNotFound' && error.code !== 27) throw error;
  });
  await BingoScore.syncIndexes();

  const legacyUserMap = new Map(legacyUsers.map(user => [String(user.id), user]));
  let linkedScores = 0;
  for (const row of leaderboard) {
    const legacyUser = legacyUserMap.get(String(row.user_id));
    const mongoUser = legacyUser?.username ? await User.findOne({ username: legacyUser.username }) : null;
    const filter = mongoUser
      ? { user: mongoUser._id, age_group_id: String(row.age_group_id), category_id: String(row.category_id) }
      : { legacyUserId: String(row.user_id), age_group_id: String(row.age_group_id), category_id: String(row.category_id) };
    await BingoScore.findOneAndUpdate(filter, {
      $set: {
        ...(mongoUser ? { user: mongoUser._id } : {}),
        legacyUserId: String(row.user_id),
        displayName: legacyUser?.username || [legacyUser?.first_name, legacyUser?.last_name].filter(Boolean).join(' ') || 'Legacy player',
        age_group_id: String(row.age_group_id), category_id: String(row.category_id), score: Number(row.score) || 0
      }
    }, { upsert: true });
    if (mongoUser) linkedScores += 1;
  }

  console.log(JSON.stringify({
    ageGroups: ageGroups.length,
    categories: categories.length,
    questions: questions.length,
    scores: leaderboard.length,
    scoresLinkedToMongoUsers: linkedScores
  }, null, 2));
}

migrate().then(() => mongoose.disconnect()).catch(async error => {
  console.error(error.message);
  await mongoose.disconnect().catch(() => {});
  process.exitCode = 1;
});
