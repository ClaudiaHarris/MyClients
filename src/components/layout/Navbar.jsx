//TODO import CSS?
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="nav-button-links">
        <li><button className="nav-button-link">Dashboard</button></li>
        <li><button className="nav-button-link active">Clients</button></li>
        <li><button className="nav-button-link">Projects</button></li>
        <li><button className="nav-button-link">Contracts</button></li>
      </ul>
      <div className="nav-right">
        <button className="user-profile">
          <FontAwesomeIcon icon={faUser} className="user-icon"/> 
        </button>
        <button className="settings">
          <FontAwesomeIcon icon={faCog} className="settings-icon"/> 
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;