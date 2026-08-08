import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function ProfileMenu() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem('token');

  if (!token) return null;

  const username = localStorage.getItem('username') || 'študent';
  const email = localStorage.getItem('email') || 'E-pošta ni na voljo';
  const password = sessionStorage.getItem('profilePassword') || '';

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('pendingGame');
    sessionStorage.removeItem('profilePassword');
    if (window.api?.setCurrentUser) await window.api.setCurrentUser(null);
    navigate('/');
  };

  return <>
    <button className="profile-icon" type="button" onClick={() => setProfileOpen(!profileOpen)} aria-label="Profil" aria-expanded={profileOpen}>👤</button>
    {profileOpen && <div className="profile-panel">
      <h2>Profil</h2>
      <div className="profile-field"><span>Uporabniško ime</span><strong>{username}</strong></div>
      <div className="profile-field"><span>E-pošta</span><strong>{email}</strong></div>
      <div className="profile-field"><span>Geslo</span><div className="profile-password"><strong>{password ? (showPassword ? password : '••••••••') : 'Ponovno se prijavi za prikaz'}</strong>{password && <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Skrij geslo' : 'Prikaži geslo'}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button>}</div></div>
      <button className="profile-logout" type="button" onClick={logout}>Odjava</button>
    </div>}
  </>;
}
