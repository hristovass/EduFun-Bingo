import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/QuestionPages.css';
import { useNavigate, useParams } from 'react-router-dom';

function QuestionsPage({ onComplete }) { 
    const { category } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isGameOver, setIsGameOver] = useState(false);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:8090/api/questions/${category}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
                alert('Došlo je do greške prilikom učitavanja pitanja: ' + error.message);
            }
        };
        
        fetchQuestions();
    }, [category]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsGameOver(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAnswerClick = (answer) => {
        if (selectedAnswer === null) {
            const isCorrect = answer === currentQuestion.correctAnswer;
            setSelectedAnswer(isCorrect);
            if (isCorrect) {
                setScore(score + 1);
            }
            setIsGameOver(true);
        }
    };

    useEffect(() => {
        if (isGameOver) {
            const timer = setTimeout(async () => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);
                    setTimeLeft(15);
                    setIsGameOver(false);
                } else {
                    await saveResult();
                    if (onComplete) {
                        onComplete();
                    }
                }
            }, 2000);
    
            return () => clearTimeout(timer);
        }
    }, [isGameOver, currentQuestionIndex, questions, onComplete]);

    const saveResult = async () => {
        const result = {
            username,
            category,
            score
        };
    
        try {
            const response = await fetch('http://localhost:8090/api/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            });
    
            if (!response.ok) {
                throw new Error('Failed to save result');
            }
            navigate(`/results?username=${username}`);
        } catch (error) {
            console.error('Error saving result:', error);
            alert('Došlo je do greške prilikom čuvanja rezultata: ' + error.message);
        }
    };

    if (questions.length === 0) {
        return <div className="loading-text">Loading questions...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container question-page text-center mt-5">
            <h3 className="question-text">{currentQuestion.question}</h3>
            <div className="mt-4 answers-container">
                {currentQuestion.answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(answer)}
                        className={`btn btn-lg me-3 mb-3 answer-btn ${selectedAnswer !== null && answer === currentQuestion.correctAnswer ? 'btn-success' : selectedAnswer !== null ? 'btn-danger' : ''}`}
                        disabled={selectedAnswer !== null}
                    >
                        {answer}
                    </button>
                ))}
            </div>
            <div className="mt-4 score-time-container">
                <h4 className="score-text">Points: {score}</h4>
                <h4 className="time-text">Time: {timeLeft}s</h4>
            </div>
            <div className="mt-4 back-button-container">
                <button onClick={() => navigate('/category')} className="btn btn-secondary back-button">Back</button>
            </div>
        </div>
    );
}

export default QuestionsPage;
