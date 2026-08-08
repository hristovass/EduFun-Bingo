import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles/Register.css';

export default function Login() {
  const [username,setUsername]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState(''); const [showPassword,setShowPassword]=useState(false); const navigate=useNavigate();
  const handleSubmit=async(e)=>{e.preventDefault();
    try {
      const response=await fetch('http://localhost:8090/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
      const data=await response.json();
      if(response.ok){
        localStorage.setItem('token',data.token);
        localStorage.setItem('username',data.user?.username || username);
        localStorage.setItem('email',data.user?.email || '');
        sessionStorage.setItem('profilePassword',password);
        if(window.api?.setCurrentUser) await window.api.setCurrentUser({username});
        const pending=localStorage.getItem('pendingGame'); localStorage.removeItem('pendingGame');
        if(pending==='bingo' && window.api?.openBingo) await window.api.openBingo();
        else if(pending==='edufun') navigate('/edufun'); else navigate('/hub');
      } else setMessage(data.message || 'Prijava ni uspela.');
    } catch { setMessage('Strežnik ni dosegljiv. Zaženi skupni projekt z npm run dev:all.'); }
  };
  return <div className="auth-page"><button className="page-back-button" type="button" onClick={()=>navigate('/')} aria-label="Nazaj">←</button><div className="auth-form-card"><div className="brand-pill">STUDENT LEARNING HUB</div><h1>Prijava</h1><p>En račun za EduFun in Quiz Bingo.</p><form onSubmit={handleSubmit}><label>Uporabniško ime<input value={username} onChange={e=>setUsername(e.target.value)} required /></label><label>Geslo<div className="password-input-wrap"><input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} required /><button type="button" className="password-toggle" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword ? 'Skrij geslo' : 'Prikaži geslo'}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button></div></label><button className="primary-action" type="submit">Prijavi se</button></form><p className="form-message">{message}</p><button className="text-action" type="button" onClick={()=>navigate('/register')}>Še nimaš računa? Registracija</button></div></div>;
}


