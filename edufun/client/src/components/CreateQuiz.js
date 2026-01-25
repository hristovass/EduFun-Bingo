import React, { useState } from 'react';
import './styles/CreateQuiz.css';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].correctAnswer = value;
        setQuestions(newQuestions);
    };

    const handleSaveQuiz = async () => {
        const quizData = {
          category: category, 
          questions: questions.map(q => ({
            question: q.question,
            correctAnswer: q.correctAnswer,
            answers: q.answers
          }))
        };
      
        console.log('Sending quiz data:', quizData);
      
        try {
          const response = await fetch('http://localhost:8090/api/quiz/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizData)
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            throw new Error(result.message || 'Error creating quiz');
          }
      
          alert(result.message);
        } catch (error) {
          console.error('Failed to save quiz:', error);
          alert('Failed to save quiz. Please try again.');
        }
      };
      

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="create-quiz-container">
            <h2 className="create-quiz-title">Create a New Quiz</h2>
            <div className="category-select-container">
                <select className="form-select" value={category} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    <option value="history">History</option>
                    <option value="technology">Technology</option>
                    <option value="geography">Geography</option>
                    <option value="music">Music</option>
                </select>
            </div>

            {questions.map((q, qIndex) => (
                <div key={qIndex} className="question-container">
                    <input
                        type="text"
                        placeholder={`Enter question ${qIndex + 1}`}
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="question-input"
                    />
                    {q.options.map((option, oIndex) => (
                        <input
                            key={oIndex}
                            type="text"
                            placeholder={`Option ${oIndex + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                            className="option-input"
                        />
                    ))}
                    <select
                        className="correct-answer-select"
                        value={q.correctAnswer}
                        onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                    >
                        <option value="">Select Correct Answer</option>
                        {q.options.map((option, oIndex) => (
                            <option key={oIndex} value={option}>
                                {option || `Option ${oIndex + 1}`}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            <button className="animated-button" onClick={handleSaveQuiz}>
                Save Quiz
            </button>
            <button className="animated-button" onClick={handleBack} style={{ marginTop: '10px' }}>
                Back
            </button>
        </div>
    );
};

export default CreateQuiz;
