import React, { useState } from 'react';
import './styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:8090/login' : 'http://localhost:8090/register';
    const body = isLogin 
      ? JSON.stringify({ username, password }) 
      : JSON.stringify({ username, email, password });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      setMessage(isLogin ? 'Login successful!' : 'User registered successfully. Redirecting to login...');
      
      if (isLogin) {
        localStorage.setItem('token', data.token);
        window.location.href = '/category';
      } else {
        setTimeout(() => {
          window.location.href = '/login'; 
        }, 2000);
      }
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">{isLogin ? 'Prijavite se' : 'Registracija'}</h1>
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
        {!isLogin && (
          <div className="form-group">
            <label className="label">
              Email:
              <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </label>
          </div>
        )}
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
        <button type="submit" className="button">{isLogin ? 'Prijavi se' : 'Registruj se'}</button>
      </form>
      <p className="message">{message}</p>
      <div className="toggle-container">
        <p>{isLogin ? 'Nemate nalog?' : 'Već imate nalog?'}</p>
        <button 
          className="button" 
          onClick={() => setIsLogin(!isLogin)} 
        >
          {isLogin ? 'Registrujte se' : 'Prijavi se'}
        </button>
      </div>
    </div>
  );
}

export default Register;
