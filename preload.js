const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Age groups
  getAgeGroups: async () => {
    return ipcRenderer.invoke('get-age-groups');
  },

  // Window actions
  openAddPlayerWindow: () => {
    ipcRenderer.send('open-add-player');
  },

  // Auth / players
  registerPlayer: (player) => ipcRenderer.invoke('register-player', player),
  loginPlayer: (creds) => ipcRenderer.invoke('login-player', creds),
  onPlayerAdded: (callback) =>
    ipcRenderer.on('player-added', (_, player) => callback(player)),

  // Menu
  loadMenu: () => ipcRenderer.invoke('loadMenu'),

  // Leaderboard
  leaderboard: (groups, categories) =>
    ipcRenderer.invoke('leaderboard', { groups, categories }),

  // Game
  startGame: (group, categories, players) =>
    ipcRenderer.invoke('startGame', { group, categories, players }),

  // Answer
  answer: (playerId, questionId, selectedIndex) =>
    ipcRenderer.invoke('answer', { playerId, questionId, selectedIndex }),

  // Score
  getTotalScore: (userId) => ipcRenderer.invoke('get-total-score', userId),

  // ✅ Local lessons (assets/lessons.json) — branje se zgodi v main (index.js)
  getLocalLessons: () => ipcRenderer.invoke('get-local-lessons'),
});
