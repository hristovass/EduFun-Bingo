import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hub() {
  const navigate = useNavigate();

  const [authPrompt, setAuthPrompt] = useState(false);
  const [pending, setPending] = useState(null);

  const username = localStorage.getItem('username') || 'študent';
  const signedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (window.api?.setCurrentUser && username !== 'študent') {
      window.api.setCurrentUser({ username });
    }
  }, [username]);

  const chooseGame = (game) => {
    if (!signedIn) {
      localStorage.setItem('pendingGame', game);
      setPending(game);
      setAuthPrompt(true);
      return;
    }

    if (game === 'edufun') {
      navigate('/edufun');
    } else {
      window.location.href = '/bingo/index.html';
    }
  };

  return (
    <div className="integrated-page">
      <div className="integrated-shell">

        <div className="brand-pill">
          EDUFUN ACADEMIC PLATFORM
        </div>

        <div className="hero-layout">
          <div>
            <h1 className="hero-title">
              Znanje skozi igro.
            </h1>

            <p className="hero-subtitle">
              {signedIn
                ? `Dobrodošel, ${username}. Izberi način in začni.`
                : 'Izberi način in začni.'}
            </p>
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <span>EF</span>
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="game-grid">
          <button
            className="game-card"
            onClick={() => chooseGame('edufun')}
          >
            <span
              className="game-visual game-visual-quiz"
              aria-hidden="true"
            >
              <i>01</i>
            </span>

            <span className="game-index">
              KNOWLEDGE
            </span>

            <strong>EduFun Quiz</strong>

            <span className="game-cta">
              Odpri EduFun <span>→</span>
            </span>
          </button>

          <button
            className="game-card"
            onClick={() => chooseGame('bingo')}
          >
            <span
              className="game-visual game-visual-bingo"
              aria-hidden="true"
            >
              <i>02</i>
            </span>

            <span className="game-index">
              COMPETE
            </span>

            <strong>Quiz Bingo</strong>

            <span className="game-cta">
              Odpri Bingo <span>→</span>
            </span>
          </button>
        </div>

      </div>

      {authPrompt && (
        <div
          className="auth-overlay"
          onClick={() => setAuthPrompt(false)}
        >
          <div
            className="auth-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lock-icon">🔐</div>

            <h2>Najprej se prijavi</h2>

            <p>
              Za {pending === 'bingo' ? 'Quiz Bingo' : 'EduFun'} uporabljaš
              isti račun kot za celotno aplikacijo.
            </p>

            <button
              className="primary-action"
              onClick={() => navigate('/login')}
            >
              Prijava
            </button>

            <button
              className="secondary-action"
              onClick={() => navigate('/register')}
            >
              Ustvari račun
            </button>
          </div>
        </div>
      )}
    </div>
  );
}