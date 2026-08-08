import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [authPrompt, setAuthPrompt] = useState(false);
  const [pending, setPending] = useState(null);
  const signedIn = !!localStorage.getItem('token');

  const chooseGame = async (game) => {
    if (!signedIn) {
      localStorage.setItem('pendingGame', game);
      setPending(game);
      setAuthPrompt(true);
      return;
    }
    if (game === 'edufun') navigate('/edufun');
    else if (window.api?.openBingo) await window.api.openBingo();
    else alert('Za Bingo zaženi skupni projekt z ukazom npm run dev:all.');
  };

  return <div className="integrated-page">
    <div className="integrated-shell">
      <div className="brand-pill">EDUFUN ACADEMIC PLATFORM</div>
      <div className="hero-layout"><div><h1 className="hero-title">Znanje skozi igro.</h1><p className="hero-subtitle">Izberi način in začni.</p></div><div className="hero-orbit" aria-hidden="true"><span>EF</span><i /><i /><i /></div></div>
      <div className="game-grid">
        <button className="game-card" onClick={() => chooseGame('edufun')}>
          <span className="game-visual game-visual-quiz" aria-hidden="true"><i>01</i></span><span className="game-index">KNOWLEDGE</span><strong>EduFun Quiz</strong><span className="game-cta">Odpri EduFun <span>→</span></span>
        </button>
        <button className="game-card" onClick={() => chooseGame('bingo')}>
          <span className="game-visual game-visual-bingo" aria-hidden="true"><i>02</i></span><span className="game-index">COMPETE</span><strong>Quiz Bingo</strong><span className="game-cta">Odpri Bingo <span>→</span></span>
        </button>
      </div>
      {signedIn && <button className="secondary-action" onClick={() => navigate('/hub')}>Pojdi na moj študentski hub</button>}
    </div>

    {authPrompt && <div className="auth-overlay" onClick={() => setAuthPrompt(false)}>
      <div className="auth-card" onClick={e => e.stopPropagation()}>
        <div className="lock-icon">🔐</div>
        <h2>Najprej se prijavi</h2>
        <p>Za {pending === 'bingo' ? 'Quiz Bingo' : 'EduFun'} uporabljaš isti račun kot za celotno aplikacijo.</p>
        <button className="primary-action" onClick={() => navigate('/login')}>Prijava</button>
        <button className="secondary-action" onClick={() => navigate('/register')}>Ustvari račun</button>
      </div>
    </div>}
  </div>;
}
