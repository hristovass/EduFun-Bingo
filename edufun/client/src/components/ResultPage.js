import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ResultPage.css';
import { useNavigate } from 'react-router-dom';

function ResultPage() {
    const [results, setResults] = useState([]);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            if (!username) {
                console.error('Korisničko ime nije definirano');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8090/api/results?username=${username}`);
                console.log('Response Status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Results fetched:', data);
                setResults(data);
            } catch (error) {
                console.error('Error fetching results:', error);
                alert('Došlo je do greške prilikom učitavanja rezultata: ' + error.message);
            }
        };
    
        fetchResults();
    }, [username]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container text-center mt-5">
            <h2 className="results-title">Results for {username || 'user'}</h2>
            {results.length === 0 ? (
                <div className="alert alert-info">Nema sačuvanih rezultata za ovog korisnika.</div>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>CATEGORY</th>
                            <th>POINTS</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.category}</td>
                                <td>{result.score}</td>
                                <td>{formatDate(result.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="mt-4">
            <button 
    onClick={() => navigate('/category')}
    className="button"
>
    Back
</button>
            </div>
        </div>
    );
}

export default ResultPage;
