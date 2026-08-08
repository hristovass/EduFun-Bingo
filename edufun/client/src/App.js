import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './components/styles/Integrated.css';
import './components/styles/Navigation.css';
import './components/styles/Professional.css';
import Register from './components/Register';
import Login from './components/Login';
import CategoryPage from './components/Category';
import QuestionsPage from './components/QuestionHistory';
import ResultPage from './components/ResultPage';
import Settings from './components/Settings';
import Home from './components/Home';
import Hub from './components/Hub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import CreateQuiz from './components/CreateQuiz';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
  };
  useEffect(() => { document.body.className = theme; }, [theme]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/edufun" element={<CategoryPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/questions/:category" element={<QuestionsPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
      <Link to="/settings" className="settings-icon"><FontAwesomeIcon icon={faCog} /></Link>
    </div>
  );
}
export default App;
