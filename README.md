
# EduFun-Bingo

Bingo-upgraded is an interactive quiz designed for high school students, organized by grade level (1st, 2nd, and 3rd year) and divided into four subjects. Each grade includes carefully selected questions tailored to the students knowledge level.


## Installation & Run
Before running the project for the first time, install all required packages:

```bash
npm install
```

After the installation is complete, you can start the project with:
```bash
npm run dev:all
# EduFun + Quiz Bingo

Both games now run in one browser application and use the same MongoDB user login.

## One-time Bingo data migration

The migration copies Bingo age groups, categories, questions, and leaderboard scores from the configured Supabase project into MongoDB. It can be run more than once without duplicating records.

```powershell
npm.cmd run migrate:bingo
```

MongoDB Atlas must allow your current IP address before running the migration. Legacy Bingo passwords are intentionally not copied. Existing leaderboard entries are linked to MongoDB accounts when their usernames match.

## Start the web application

```powershell
npm.cmd run dev:all
```

Open `http://localhost:3000`. This command starts only the Express API and React client; it does not launch Electron. After signing in, both EduFun and Quiz Bingo use the same JWT-authenticated account.
