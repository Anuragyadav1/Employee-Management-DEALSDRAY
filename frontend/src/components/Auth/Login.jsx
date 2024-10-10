import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    // Replace this with your actual logic to check if user is authenticated
    const token = localStorage.getItem('token');
    return token;
  };

  useEffect(()=>{
    if (isLoggedIn()) {
      // If the user is logged in, redirect them to the homepage or dashboard
      navigate('/'); // Change this to the desired redirect path
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className='input-group'>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
