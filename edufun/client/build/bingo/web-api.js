(function () {
  const API_URL = 'http://localhost:8090/api/bingo';
  async function request(path, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; throw new Error('Prijava je obvezna.'); }
    const response = await fetch(API_URL + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) }
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 401) { localStorage.removeItem('token'); window.location.href = '/login'; }
    if (!response.ok) throw new Error(data.error || 'Bingo API request failed.');
    return data;
  }
  window.api = {
    loadMenu: () => request('/menu'),
    getAgeGroups: async () => (await request('/menu')).ageGroups,
    getLocalLessons: () => request('/lessons'),
    leaderboard: (groups, categories) => request(`/leaderboard?groups=${encodeURIComponent(groups.join(','))}&categories=${encodeURIComponent(categories.join(','))}`),
    startGame: (group, categories) => request('/games', { method: 'POST', body: JSON.stringify({ group, categories }) }),
    answer: (playerId, questionId, selectedIndex) => request('/games/answer', { method: 'POST', body: JSON.stringify({ playerId, questionId, selectedIndex }) }),
    getTotalScore: () => request('/score'),
    getStats: () => request('/stats'),
    clearStats: () => request('/stats', { method: 'DELETE' }),
    getCurrentUser: () => request('/me'),
    ensureBingoPlayer: async () => ({ success: true, data: await request('/me') }),
    onPlayerAdded: callback => request('/me').then(callback).catch(console.error),
    openAddPlayerWindow: () => alert('Bingo uporablja tvoj prijavljeni skupni profil. Dodatna prijava ni potrebna.'),
    registerPlayer: async () => ({ success: false, error: 'Uporabi skupno registracijo v EduFun.' }),
    loginPlayer: async () => ({ success: false, error: 'V Bingo si že prijavljen s skupnim profilom.' }),
    openHub: () => { window.location.href = '/hub'; },
    openBingo: () => { window.location.href = '/bingo/index.html'; }
  };

  function addSharedChrome() {
    const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
    const isMenu = /\/bingo\/(?:index\.html)?$/.test(window.location.pathname);
    const back = document.createElement('button');
    back.className = 'bingo-chrome-button bingo-back';
    back.type = 'button';
    back.setAttribute('aria-label', 'Nazaj');
    back.textContent = '←';
    back.onclick = () => { window.location.href = isMenu ? '/hub' : '/bingo/index.html'; };

    const profile = document.createElement('button');
    profile.className = 'bingo-chrome-button bingo-profile';
    profile.type = 'button';
    profile.setAttribute('aria-label', 'Profil');
    profile.setAttribute('aria-expanded', 'false');
    const selectedPlayer = localStorage.getItem('avatar_select_player');
    const legacyAvatar = selectedPlayer && localStorage.getItem(`avatar_${selectedPlayer}`);
    const profileAvatar = localStorage.getItem('profileAvatar') || (legacyAvatar ? `/bingo/images/avatars/${legacyAvatar}` : '');
    if (profileAvatar) {
      const avatarImage = document.createElement('img');
      avatarImage.className = 'bingo-profile-avatar';
      avatarImage.src = profileAvatar;
      avatarImage.alt = '';
      profile.appendChild(avatarImage);
    } else {
      profile.innerHTML = '<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 19c.7-4 3-6 6.5-6s5.8 2 6.5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
    }

    const settings = document.createElement('button');
    settings.className = 'bingo-chrome-button bingo-settings';
    settings.type = 'button';
    settings.setAttribute('aria-label', 'Nastavitve');
    settings.innerHTML = '<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
    settings.onclick = () => { window.location.href = '/settings'; };

    const username = localStorage.getItem('username') || 'študent';
    const email = localStorage.getItem('email') || 'E-pošta ni na voljo';
    const password = sessionStorage.getItem('profilePassword') || '';
    const panel = document.createElement('aside');
    panel.className = 'bingo-profile-panel';
    panel.hidden = true;
    panel.innerHTML = `
      <h2>Profil</h2>
      <div class="bingo-profile-field"><span>Uporabniško ime</span><strong>${escapeHtml(username)}</strong></div>
      <div class="bingo-profile-field"><span>E-pošta</span><strong>${escapeHtml(email)}</strong></div>
      <div class="bingo-profile-field"><span>Geslo</span><div class="bingo-password-row"><strong data-password>${password ? '••••••••' : 'Ponovno se prijavi za prikaz'}</strong>${password ? '<button class="bingo-password-toggle" type="button" aria-label="Prikaži geslo">👁</button>' : ''}</div></div>
      <button class="bingo-profile-logout" type="button">Odjava</button>`;

    profile.onclick = () => {
      panel.hidden = !panel.hidden;
      profile.setAttribute('aria-expanded', String(!panel.hidden));
    };
    let passwordVisible = false;
    panel.querySelector('.bingo-password-toggle')?.addEventListener('click', event => {
      passwordVisible = !passwordVisible;
      panel.querySelector('[data-password]').textContent = passwordVisible ? password : '••••••••';
      event.currentTarget.textContent = passwordVisible ? '🙈' : '👁';
    });
    panel.querySelector('.bingo-profile-logout').onclick = () => {
      ['token', 'username', 'email', 'pendingGame'].forEach(key => localStorage.removeItem(key));
      sessionStorage.removeItem('profilePassword');
      window.location.href = '/';
    };

    document.body.append(back, profile, settings, panel);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addSharedChrome);
  else addSharedChrome();
})();
