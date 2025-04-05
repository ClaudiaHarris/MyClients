import React from "react";
import './Navbar.css';

const Navbar = () => {

  //placeholders since this is not the full app
  const handleClick = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/globaltech-logo-light.svg`} 
        alt="Logo" className="logo-image" />
        <span className="logo-text">Client Relationship Manager</span>
      </div>
      <ul className="nav-links">
        <li>
          <button onClick={() => handleClick('Dashboard')} className="nav-link">Dashboard</button>
        </li>
        <li>
        <button onClick={() => handleClick('Clients')} className="nav-link active">Clients</button>
        </li>
        <li>
        <button onClick={() => handleClick('Projects')} className="nav-link">Projects</button>
        </li>
        <li>
        <button onClick={() => handleClick('Contracts')} className="nav-link">Contracts</button>
        </li>
      </ul>
      <div className="user-controls">
        <button className="logout-button">Exit</button>
      </div>
    </nav> 
  );
};

export default Navbar;