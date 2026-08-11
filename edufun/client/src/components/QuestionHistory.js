import React, { useState, useEffect, useCallback } from "react";
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

    // Shuffle answers
    const shuffleArray = (items) => {
        const array = [...items];

        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    };

    // Load questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                setLoadError(null);

                const response = await fetch(
                    `http://localhost:8090/api/questions/${category}`
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! status: ${response.status}`
                    );
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

                alert(
                    'Failed to load questions: ' + error.message
                );

                setQuestions([]);

            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();

    }, [category]);

    // Timer
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

    }, [
        questions.length,
        isGameOver,
        currentQuestionIndex
    ]);

    // Save result
    const saveResult = useCallback(async () => {
        const result = {
            username,
            category,
            score
        };

        try {
            const response = await fetch(
                'http://localhost:8090/api/results',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save result');
            }

            navigate(`/results?username=${username}`);

        } catch (error) {
            console.error('Error saving result:', error);

            alert(
                'Pri shranjevanju rezultata je prišlo do napake: ' +
                error.message
            );
        }

    }, [
        username,
        category,
        score,
        navigate
    ]);

    // Go to next question
    const goToNextQuestion = useCallback(async () => {
        if (currentQuestionIndex < questions.length - 1) {

            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(15);
            setIsGameOver(false);

        } else {

            await saveResult();

            if (onComplete) {
                onComplete();
            }
        }

    }, [
        currentQuestionIndex,
        questions.length,
        saveResult,
        onComplete
    ]);

    // Handle answer
    const handleAnswerClick = (answer) => {
        if (selectedAnswer !== null) {
            return;
        }

        const currentQuestion =
            questions[currentQuestionIndex];

        const isCorrect =
            answer === currentQuestion.correctAnswer;

        setSelectedAnswer(isCorrect);

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }

        setIsGameOver(true);
    };

    // Skip question
    const handleSkip = async () => {
        if (skipUsed || questions.length === 0) {
            return;
        }

        setSkipUsed(true);
        setSelectedAnswer(null);
        setIsGameOver(false);

        await goToNextQuestion();
    };

    // Automatically continue after answer / timeout
    useEffect(() => {
        if (!isGameOver) {
            return;
        }

        const timer = setTimeout(async () => {
            await goToNextQuestion();
        }, 2000);

        return () => clearTimeout(timer);

    }, [
        isGameOver,
        goToNextQuestion
    ]);

    // Loading / errors
    if (questions.length === 0) {

        if (isLoading) {
            return (
                <div className="loading-text">
                    Loading questions...
                </div>
            );
        }

        if (loadError) {
            return (
                <div className="loading-text">
                    Failed to load questions.
                </div>
            );
        }

        return (
            <div className="loading-text">
                No questions found for this category.
            </div>
        );
    }

    const currentQuestion =
        questions[currentQuestionIndex];

    return (
        <main className="question-page">

            <button
                className="page-back-button"
                type="button"
                onClick={() => navigate('/category')}
                aria-label="Nazaj"
            >
                ←
            </button>

            <div className="quiz-meta">
                <span>{category}</span>

                <span>
                    Vprašanje {currentQuestionIndex + 1}
                    {' / '}
                    {questions.length}
                </span>
            </div>

            <div className="quiz-progress">
                <span
                    style={{
                        width:
                            `${(
                                (currentQuestionIndex + 1) /
                                questions.length
                            ) * 100}%`
                    }}
                />
            </div>

            <h3 className="question-text">
                {currentQuestion.question}
            </h3>

            <div className="mt-4 answers-container">

                {currentQuestion.shuffledAnswers.map(
                    (answer, index) => (

                        <button
                            key={index}
                            onClick={() =>
                                handleAnswerClick(answer)
                            }
                            className={
                                `btn btn-lg me-3 mb-3 answer-btn ${
                                    selectedAnswer !== null &&
                                    answer ===
                                    currentQuestion.correctAnswer
                                        ? 'btn-success'
                                        : selectedAnswer !== null
                                            ? 'btn-danger'
                                            : ''
                                }`
                            }
                            disabled={
                                selectedAnswer !== null
                            }
                        >
                            {answer}
                        </button>

                    )
                )}

            </div>

            <div className="mt-4 score-time-container">

                <h4 className="score-text">
                    <small>TOČKE</small>
                    {score}
                </h4>

                <h4 className="time-text">
                    <small>PREOSTALI ČAS</small>
                    {timeLeft}s
                </h4>

            </div>

            <div className="mt-4 skip-button-container">

                <button
                    onClick={handleSkip}
                    className="skip-button"
                    disabled={
                        skipUsed ||
                        isGameOver ||
                        questions.length === 0
                    }
                >
                    {skipUsed
                        ? 'Preskok porabljen'
                        : 'Preskoči vprašanje'}
                </button>

            </div>

        </main>
    );
}

export default QuestionsPage;