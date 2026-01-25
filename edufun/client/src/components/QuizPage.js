import React, { useState } from 'react';
import QuestionsPage from './QuestionHistory';

function QuizPage() {
    const [quizCompleted, setQuizCompleted] = useState(false);


    const handleComplete = () => {
        setQuizCompleted(true);
        console.log('Kviz je završen!');
    };

    return (
        <div>
            {quizCompleted ? (
                <div className="container text-center mt-5">
                    <h2>Čestitamo, završili ste kviz!</h2>
                    <button onClick={() => setQuizCompleted(false)} className="btn btn-primary">Pokušajte ponovo</button>
                </div>
            ) : (
                <QuestionsPage category="someCategory" onComplete={handleComplete} />
            )}
        </div>
    );
}

export default QuizPage;
