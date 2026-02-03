import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/QuestionPages.css';
import { useNavigate, useParams } from 'react-router-dom';

function QuestionsPage({ onComplete }) { 
    const { category } = useParams();
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isGameOver, setIsGameOver] = useState(false);
    const [skipUsed, setSkipUsed] = useState(false);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const shuffleArray = (items) => {
        const array = [...items];
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                setLoadError(null);
                const response = await fetch(`http://localhost:8090/api/questions/${category}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const shuffled = data.map((q) => ({
                    ...q,
                    shuffledAnswers: shuffleArray(q.answers),
                }));
                setQuestions(shuffled);
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setScore(0);
                setTimeLeft(15);
                setIsGameOver(false);
                setSkipUsed(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoadError(error);
                alert('Failed to load questions: ' + error.message);
                setQuestions([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchQuestions();
    }, [category]);

    useEffect(() => {
        if (questions.length === 0 || isGameOver) {
            return;
        }
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
    }, [questions.length, isGameOver, currentQuestionIndex]);

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

    const goToNextQuestion = async () => {
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
    };

    const handleSkip = async () => {
        if (skipUsed || questions.length === 0) {
            return;
        }
        setSkipUsed(true);
        setSelectedAnswer(null);
        setIsGameOver(false);
        await goToNextQuestion();
    };

    useEffect(() => {
        if (isGameOver) {
            const timer = setTimeout(async () => {
                await goToNextQuestion();
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
            alert('DoÅ¡lo je do greÅ¡ke prilikom Äuvanja rezultata: ' + error.message);
        }
    };

    if (questions.length === 0) {
        if (isLoading) {
            return <div className="loading-text">Loading questions...</div>;
        }
        if (loadError) {
            return <div className="loading-text">Failed to load questions.</div>;
        }
        return <div className="loading-text">No questions found for this category.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container question-page text-center mt-5">
            <h3 className="question-text">{currentQuestion.question}</h3>
            <div className="mt-4 answers-container">
                {currentQuestion.shuffledAnswers.map((answer, index) => (
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
                <button
                    onClick={handleSkip}
                    className="btn btn-secondary back-button skip-button"
                    disabled={skipUsed || isGameOver || questions.length === 0}
                >
                    {skipUsed ? 'Skip Used' : 'Skip'}
                </button>
            </div>
        </div>
    );
}

export default QuestionsPage;
