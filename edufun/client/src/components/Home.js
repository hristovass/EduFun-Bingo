import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ showContent }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="letter-container">
                <span className="letter">Q</span>
                <span className="letter">U</span>
                <span className="letter">I</span>
                <span className="letter">Z</span>
            </div>
            {showContent && (
                <div className="visible">
                    <div>
                        <h2>Before we start, let's register</h2>
                    </div>
                    <div className="buttons-container">
                        <button className="animated-button" onClick={() => navigate('/register')}>Register</button>
                        <button className="animated-button" onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
