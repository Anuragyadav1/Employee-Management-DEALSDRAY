import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
import logo from '../../assets/logo-color.png'

const Navbar = () => {
  const { logout, token, user } = useContext(AuthContext); // Assuming `user` contains the admin/user info
  const username = localStorage.getItem('username')
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>
          <Link to="/" className="navbar-title">
             <img src={logo} alt="Logo" className="navbar-logo" />
          </Link>
        </h2>
      </div>
      <div className="nav-links">
        {token ? (
          <> <Link to="/" className="nav-link">Home</Link>
            <Link to="/create-employee" className="nav-link">CreateEmployee</Link>
            <Link to="/employees" className="nav-link">EmployeeList</Link>
            <Link to="/dashboard" className="nav-link">  <span className="user-info">{username || 'Admin'} </span> </Link>{/* Display username */}
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (<>
             <Link to="/" className="nav-link">Home</Link>
             <Link to="/login" className="nav-link">Login</Link>
           </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
