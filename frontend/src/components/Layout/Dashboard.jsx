import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const username = localStorage.getItem("username")
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Admin Panel</h1>
        <nav className="dashboard-nav">
          <Link to="/employees" className="nav-linkk">Employee List</Link>
          <Link to="/create-employee" className="nav-linkk">Create Employee</Link>
        </nav>
      </header>

      <main className="dashboard-main">
        <h2>Welcome, {username}!</h2>
        <p>You can manage employees and edit their information here.</p>
      </main>
    </div>
  );
};

export default Dashboard;
