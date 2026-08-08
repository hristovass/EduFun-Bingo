const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getAgeGroups: () => ipcRenderer.invoke('get-age-groups'),
  openAddPlayerWindow: () => ipcRenderer.send('open-add-player'),
  registerPlayer: (player) => ipcRenderer.invoke('register-player', player),
  loginPlayer: (creds) => ipcRenderer.invoke('login-player', creds),
  onPlayerAdded: (callback) => ipcRenderer.on('player-added', (_, player) => callback(player)),
  loadMenu: () => ipcRenderer.invoke('loadMenu'),
  leaderboard: (groups, categories) => ipcRenderer.invoke('leaderboard', { groups, categories }),
  startGame: (group, categories, players) => ipcRenderer.invoke('startGame', { group, categories, players }),
  answer: (playerId, questionId, selectedIndex) => ipcRenderer.invoke('answer', { playerId, questionId, selectedIndex }),
  getTotalScore: (userId) => ipcRenderer.invoke('get-total-score', userId),
  getLocalLessons: () => ipcRenderer.invoke('get-local-lessons'),

  // Integration bridge: one shell, one session, two games
  setCurrentUser: (user) => ipcRenderer.invoke('set-current-user', user),
  getCurrentUser: () => ipcRenderer.invoke('get-current-user'),
  openBingo: () => ipcRenderer.invoke('open-bingo'),
  openHub: () => ipcRenderer.invoke('open-hub'),
  ensureBingoPlayer: () => ipcRenderer.invoke('ensure-bingo-player')
});
