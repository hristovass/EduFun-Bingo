import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './styles/Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onThemeChange }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');
    const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'Arial');
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

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        document.documentElement.style.fontSize = fontSize === 'small' ? '12px' : fontSize === 'medium' ? '16px' : '20px';
        document.body.style.fontFamily = fontFamily;
    }, [fontSize, fontFamily]);

    const handleBackClick = () => {
        console.log("Back button clicked");
        navigate(-1);
    };

    return (
        <div className="settings">
            <h2 style={{ color: 'white' }}>Settings</h2>
            <button onClick={toggleTheme} className="btn-settings">
                <FontAwesomeIcon icon={faCog} /> Toggle Theme
            </button>
            <div className="font-size-setting">
                <label htmlFor="font-size" style={{ color: 'white' }}>Font Size: </label>
                <select id="font-size" value={fontSize} onChange={handleFontSizeChange}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>
            <div className="font-family-setting">
                <label htmlFor="font-family" style={{ color: 'white' }}>Font Family: </label>
                <select id="font-family" value={fontFamily} onChange={handleFontFamilyChange}>
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </div>
            <button className="btn-back" onClick={handleBackClick}>Back</button>
        </div>
    );
};

export default Settings;
