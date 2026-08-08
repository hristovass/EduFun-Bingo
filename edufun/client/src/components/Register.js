import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles/Register.css';

export default function Register(){
 const [username,setUsername]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState(''); const [showPassword,setShowPassword]=useState(false); const navigate=useNavigate();
 const submit=async(e)=>{e.preventDefault(); try{const r=await fetch('http://localhost:8090/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,email,password})}); const d=await r.json(); if(r.ok){setMessage('Račun je ustvarjen. Sedaj se prijavi.'); setTimeout(()=>navigate('/login'),700)} else setMessage(d.message||'Registracija ni uspela.')}catch{setMessage('Strežnik ni dosegljiv. Zaženi npm run dev:all.')}};
 return <div className="auth-page"><button className="page-back-button" type="button" onClick={()=>navigate('/')} aria-label="Nazaj">←</button><div className="auth-form-card"><div className="brand-pill">STUDENT LEARNING HUB</div><h1>Ustvari račun</h1><p>Ta račun uporabljaš za oba dela združene aplikacije.</p><form onSubmit={submit}><label>Uporabniško ime<input value={username} onChange={e=>setUsername(e.target.value)} required /></label><label>E-pošta<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Geslo<div className="password-input-wrap"><input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} minLength="6" required /><button type="button" className="password-toggle" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword ? 'Skrij geslo' : 'Prikaži geslo'}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button></div></label><button className="primary-action" type="submit">Registracija</button></form><p className="form-message">{message}</p><button className="text-action" type="button" onClick={()=>navigate('/login')}>Že imaš račun? Prijava</button></div></div>;
}


