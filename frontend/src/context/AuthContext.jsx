// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import api from '../api'; // Import the axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (username, password) => {
    try {
      // Use the api instance to make a POST request
      const res = await api.post('/api/auth/login', { username, password });
      // console.log(res)
      // Assuming the response contains the token and user data
      setToken(res.data.token);
      localStorage.setItem('username', res.data.user.username);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      // Handle error (optional)
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error; // Rethrow error to handle it in the Login component
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
