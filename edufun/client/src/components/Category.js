import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Category.css';
import { useNavigate } from 'react-router-dom';

function CategoryPage() {
    const navigate = useNavigate();

    const categories = [
        { name: 'Programiranje', image: '/images/programming.png' },
        { name: 'Algoritmi', image: '/images/algorithm.png' },
        { name: 'Matematika', image: '/images/calculator.png' },
        { name: 'Podatkovne baze', image: '/images/data-server.png' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleCategorySelect = (categoryName) => {
        navigate(`/questions/${categoryName}`);
    };

    const handleViewResults = () => {
        navigate('/results');
    };

    return (
        <div className="container text-center mt-5">
            <div className="row mt-4">
                {categories.map((category, index) => (
                    <div key={index} className="col-md-6 mb-4 d-flex justify-content-center">
                        <div
                            className="card shadow-sm category-card"
                            style={{ borderRadius: '15px', width: '150px', height: '150px', margin: '20px' }}
                            onClick={() => handleCategorySelect(category.name.toLowerCase())}
                        >
                            <img
                                src={category.image}
                                className="card-img-top"
                                alt={category.name}
                                style={{ objectFit: 'cover', borderRadius: '15px 15px 0 0' }}
                            />
                            <div className="card-body" style={{ padding: '10px' }}>
                                <h5 className="card-title" style={{ fontSize: '1.5rem', color: '#fff' }}>{category.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button onClick={handleLogout} className="button">Logout</button>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button onClick={handleViewResults} className="button">Results</button>
            </div>
        </div>
    );
}

export default CategoryPage;
