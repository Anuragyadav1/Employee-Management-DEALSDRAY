import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import EmployeeList from './components/Employee/EmployeeList';
import CreateEmployee from './components/Employee/CreateEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Layout/Dashboard';
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Layout/Home';
import NotFoundPage from './components/Layout/404Page';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/employees" 
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/create-employee" 
          element={
            <PrivateRoute>
              <CreateEmployee />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit-employee/:id" 
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
