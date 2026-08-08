import React from 'react';
import './styles/Category.css';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Programiranje', slug: 'programiranje', code: 'PRG', symbol: '</>' },
  { name: 'Algoritmi', slug: 'algoritmi', code: 'ALG', symbol: 'ƒ(x)' },
  { name: 'Matematika', slug: 'matematika', code: 'MAT', symbol: '∑' },
  { name: 'Podatkovne baze', slug: 'podatkovne baze', code: 'PDB', symbol: 'DB' },
];

export default function CategoryPage() {
  const navigate = useNavigate();

  return (
    <main className="workspace-page">
      <button className="page-back-button" onClick={() => navigate('/hub')} aria-label="Nazaj">←</button>
      <section className="workspace-shell category-shell">
        <header className="workspace-header">
          <div><span className="section-kicker">EDUFUN / PREDMETI</span><h1>Izberi področje</h1></div>
        </header>
        <div className="subject-grid">
          {categories.map((category) => (
            <button className="subject-card" key={category.slug} onClick={() => navigate(`/questions/${category.slug}`)}>
              <span className="subject-symbol">{category.symbol}</span>
              <span className="subject-code">{category.code}</span>
              <strong>{category.name}</strong>
              <span className="card-arrow">Začni preverjanje <b>→</b></span>
            </button>
          ))}
        </div>
        <footer className="workspace-footer"><span>4 področja znanja</span><button className="quiet-button" onClick={() => navigate('/results')}>Pregled rezultatov <b>→</b></button></footer>
      </section>
    </main>
  );
}
