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
                console.error('KorisniÄko ime nije definirano');
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
                alert('DoÅ¡lo je do greÅ¡ke prilikom uÄitavanja rezultata: ' + error.message);
            }
        };
    
        fetchResults();
    }, [username]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const allowedCategories = ['programiranje', 'algoritmi', 'matematika', 'podatkovne baze'];
    const averageByCategory = results.reduce((acc, result) => {
        if (!allowedCategories.includes(result.category)) {
            return acc;
        }
        const key = result.category;
        if (!acc[key]) {
            acc[key] = { total: 0, count: 0 };
        }
        acc[key].total += result.score;
        acc[key].count += 1;
        return acc;
    }, {});

    return (
        <div className="container text-center mt-5">
            <h2 className="results-title">Results for {username || 'user'}</h2>
            <div className="results-content">
                {results.length === 0 ? (
                    <div className="alert alert-info">Nema saÄuvanih rezultata za ovog korisnika.</div>
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
                {Object.keys(averageByCategory).length > 0 && (
                    <div className="averages averages-right">
                        {Object.entries(averageByCategory).map(([category, data]) => (
                            <div key={category} className="average-item">
                                Povprecna ocena po {category}: {(data.total / data.count).toFixed(2)}
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-4">
                    <button onClick={() => navigate('/category')} className="button">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
