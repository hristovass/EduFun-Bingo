import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import CategoryPage from './components/Category';
import QuestionsPage from './components/QuestionHistory';
import ResultPage from './components/ResultPage';
import Settings from './components/Settings';
import Home from './components/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import CreateQuiz from './components/CreateQuiz';
function App() {
    const [showContent, setShowContent] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        document.body.className = newTheme;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const onComplete = () => {
        console.log('Game is complete!');
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home showContent={showContent} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/questions/:category" element={<QuestionsPage onComplete={onComplete} />} />
                <Route path="/results" element={<ResultPage />} />
                <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} />} />
                <Route path="/create-quiz" element={<CreateQuiz />} />
            </Routes>
            <Link to="/settings" className="settings-icon">
                <FontAwesomeIcon icon={faCog} />
            </Link>
        </div>
    );
}

export default App;
