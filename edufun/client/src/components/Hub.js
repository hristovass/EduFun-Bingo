import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hub() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'študent';
  useEffect(() => { if (window.api?.setCurrentUser && username !== 'študent') window.api.setCurrentUser({ username }); }, [username]);
  const logout = async () => {
    localStorage.removeItem('token'); localStorage.removeItem('username'); localStorage.removeItem('pendingGame');
    if (window.api?.setCurrentUser) await window.api.setCurrentUser(null);
    navigate('/');
  };
  const openBingo = async () => {
    if (window.api?.openBingo) await window.api.openBingo();
    else alert('Bingo je na voljo v skupnem Electron načinu: npm run dev:all');
  };
  return <div className="integrated-page"><button className="page-back-button" type="button" onClick={() => navigate('/')} aria-label="Nazaj">←</button><div className="integrated-shell">
    <div className="hub-top"><div><div className="brand-pill">OSEBNI DELOVNI PROSTOR</div><h1 className="hero-title small">Pozdravljen, {username}.</h1></div><button className="text-action compact-action" onClick={logout}>Odjava</button></div>
    <p className="hero-subtitle">Kaj želiš vaditi danes?</p>
    <div className="game-grid">
      <button className="game-card" onClick={() => navigate('/edufun')}><span className="game-visual game-visual-quiz" aria-hidden="true"><i>01</i></span><span className="game-index">STUDY</span><strong>EduFun</strong><span className="game-cta">Začni kviz <span>→</span></span></button>
      <button className="game-card" onClick={openBingo}><span className="game-visual game-visual-bingo" aria-hidden="true"><i>02</i></span><span className="game-index">LIVE</span><strong>Quiz Bingo</strong><span className="game-cta">Začni Bingo <span>→</span></span></button>
    </div>
    <div className="hub-status"><span><i /> Povezano</span><span>Enoten profil</span><span>2 načina</span></div>
  </div></div>;
}
