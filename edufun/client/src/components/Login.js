import React, { useState } from 'react';
import './styles/Register.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8090/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.status === 200) {
      setMessage('Login successful');
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      window.location.href = '/category';
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Prijavite se</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Username:
            <input 
              type="text" 
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Password:
            <input 
              type="password" 
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </label>
        </div>
        <button type="submit" className="button">Prijavi se</button>
      </form>
      <p className="message">{message}</p>
      <div className="toggle-container">
        <p>Nemate nalog? <span onClick={() => window.location.href = '/register'} className="link">Registrujte se</span></p>
      </div>
    </div>
  );
}

export default Login;
