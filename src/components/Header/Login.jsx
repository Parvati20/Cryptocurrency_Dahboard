import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.username === username && storedData.password === password) {
      localStorage.setItem('isAuthenticated', true);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2 style={{color:"black"}}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;