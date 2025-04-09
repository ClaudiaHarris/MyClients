// src/components/layout/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>GlobalTech Solutions</h1>
      </div>
      <ul className="nav-links">
        <li><button className="navbar-button-links">Dashboard</button> </li>
        <li><a href="#" className="nav-link active">Clients</a></li>
        <li><a href="#" className="nav-link">Projects</a></li>
        <li><a href="#" className="nav-link">Accounts</a></li>
      </ul>
      <div className="nav-right">
        <button className="user-profile">
          User
        </button>
        <button className="exit-button">
          Exit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;