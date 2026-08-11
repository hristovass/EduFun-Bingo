import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMoon,
    faMusic,
    faVolumeHigh
} from '@fortawesome/free-solid-svg-icons';
import './styles/Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onThemeChange }) => {
    const [fontSize, setFontSize] = useState(
        localStorage.getItem('fontSize') || 'medium'
    );

    const [fontFamily, setFontFamily] = useState(
        localStorage.getItem('fontFamily') || 'Arial'
    );

    const [music, setMusic] = useState(
        localStorage.getItem('music') || 'on'
    );

    const [sfx, setSfx] = useState(
        localStorage.getItem('sfx') || 'on'
    );

    const navigate = useNavigate();

    const handleFontSizeChange = (e) => {
        const newSize = e.target.value;
        setFontSize(newSize);
        localStorage.setItem('fontSize', newSize);
    };

    const handleFontFamilyChange = (e) => {
        const newFont = e.target.value;
        setFontFamily(newFont);
        localStorage.setItem('fontFamily', newFont);
    };

    const toggleMusic = () => {
        const value = music === 'on' ? 'off' : 'on';

        setMusic(value);
        localStorage.setItem('music', value);
    };

    const toggleSfx = () => {
        const value = sfx === 'on' ? 'off' : 'on';

        setSfx(value);
        localStorage.setItem('sfx', value);
    };

    useEffect(() => {
        document.documentElement.style.fontSize =
            fontSize === 'small'
                ? '12px'
                : fontSize === 'large'
                    ? '20px'
                    : '16px';

        document.body.style.fontFamily = fontFamily;
    }, [fontSize, fontFamily]);

    return (
        <div className="settings-page">

            <button
                className="page-back-button"
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Nazaj"
            >
                ←
            </button>

            <main className="settings-shell">

                <div className="settings-pill">
                    EDUFUN ACADEMIC PLATFORM
                </div>

                <header className="settings-header">
                    <h1>Nastavitve</h1>
                    <p>
                        Prilagodi videz, zvok in način uporabe aplikacije.
                    </p>
                </header>

                <div className="settings-grid">

                    <section className="settings-section">

                        <div className="settings-section-head">
                            <span className="settings-icon">
                                <FontAwesomeIcon icon={faMoon} />
                            </span>

                            <div>
                                <h2>Videz</h2>
                                <p>Prilagodi prikaz aplikacije.</p>
                            </div>
                        </div>

                        <div className="setting-row">
                            <div>
                                <strong>Velikost pisave</strong>
                                <span>Izberi velikost besedila.</span>
                            </div>

                            <select
                                value={fontSize}
                                onChange={handleFontSizeChange}
                            >
                                <option value="small">Majhna</option>
                                <option value="medium">Srednja</option>
                                <option value="large">Velika</option>
                            </select>
                        </div>

                        <div className="setting-row">
                            <div>
                                <strong>Družina pisave</strong>
                                <span>Izberi slog besedila.</span>
                            </div>

                            <select
                                value={fontFamily}
                                onChange={handleFontFamilyChange}
                            >
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Times New Roman">
                                    Times New Roman
                                </option>
                                <option value="Courier New">
                                    Courier New
                                </option>
                            </select>
                        </div>

                    </section>

                    <section className="settings-section">

                        <div className="settings-section-head">
                            <span className="settings-icon">
                                <FontAwesomeIcon icon={faMusic} />
                            </span>

                            <div>
                                <h2>Zvok</h2>
                                <p>Nastavitve zvoka za Quiz Bingo.</p>
                            </div>
                        </div>

                        <button
                            className="setting-row clickable"
                            onClick={toggleMusic}
                            type="button"
                        >
                            <div>
                                <strong>
                                    <FontAwesomeIcon icon={faMusic} />
                                    {' '}Glasba v ozadju
                                </strong>

                                <span>
                                    Predvajanje glasbe med igro.
                                </span>
                            </div>

                            <span
                                className={`switch ${
                                    music === 'on' ? 'active' : ''
                                }`}
                            >
                                <i />
                            </span>
                        </button>

                        <button
                            className="setting-row clickable"
                            onClick={toggleSfx}
                            type="button"
                        >
                            <div>
                                <strong>
                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                    {' '}Zvočni učinki
                                </strong>

                                <span>
                                    Zvoki pravilnih in napačnih odgovorov.
                                </span>
                            </div>

                            <span
                                className={`switch ${
                                    sfx === 'on' ? 'active' : ''
                                }`}
                            >
                                <i />
                            </span>
                        </button>

                    </section>

                </div>

            </main>
        </div>
    );
};

export default Settings;