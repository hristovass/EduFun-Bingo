import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faMusic, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './styles/Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onThemeChange }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');
    const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'Arial');

    const [music, setMusic] = useState(localStorage.getItem('music') || 'on');
    const [sfx, setSfx] = useState(localStorage.getItem('sfx') || 'on');

    const navigate = useNavigate();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        onThemeChange(newTheme);
    };

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
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        document.documentElement.style.fontSize =
            fontSize === 'small'
                ? '12px'
                : fontSize === 'medium'
                ? '16px'
                : '20px';

        document.body.style.fontFamily = fontFamily;
    }, [fontSize, fontFamily]);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="auth-page settings-page">
            <button
                className="page-back-button"
                type="button"
                onClick={handleBackClick}
                aria-label="Nazaj"
            >
                ←
            </button>

            <div className="auth-form-card settings-card">
                <div className="brand-pill">STUDENT LEARNING HUB</div>

                <h1>Settings</h1>

                <p>Prilagodi videz in nastavitve aplikacije.</p>

                <button
                    onClick={toggleTheme}
                    className="primary-action settings-action"
                >
                    <FontAwesomeIcon icon={faCog} /> Toggle Theme
                </button>

                <div className="settings-group">
                    <label htmlFor="font-size">Velikost pisave</label>

                    <select
                        id="font-size"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                    >
                        <option value="small">Majhna</option>
                        <option value="medium">Srednja</option>
                        <option value="large">Velika</option>
                    </select>
                </div>

                <div className="settings-group">
                    <label htmlFor="font-family">Družina pisave</label>

                    <select
                        id="font-family"
                        value={fontFamily}
                        onChange={handleFontFamilyChange}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                    </select>
                </div>

                <div className="settings-group">
                    <label>Glasba v ozadju</label>

                    <button
                        onClick={toggleMusic}
                        className="primary-action settings-action"
                    >
                        <FontAwesomeIcon icon={faMusic} />
                        {" "}
                        {music === 'on'
                            ? 'Glasba: vklopljena'
                            : 'Glasba: izklopljena'}
                    </button>
                </div>

                <div className="settings-group">
                    <label>Zvočni učinki</label>

                    <button
                        onClick={toggleSfx}
                        className="primary-action settings-action"
                    >
                        <FontAwesomeIcon icon={faVolumeUp} />
                        {" "}
                        {sfx === 'on'
                            ? 'Zvoki: vklopljeni'
                            : 'Zvoki: izklopljeni'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Settings;