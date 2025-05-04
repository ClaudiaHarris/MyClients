//TODO import CSS?
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {useAuth} from '../../contexts/AuthContext';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  const {signOut} = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleNavClick = (destination) => {
    alert(`In a real CRM application, you would now navigate to ${destination}`);
  };

  return (
    <nav className="navbar">
      
      <ul className="nav-button-links">
        <li><button className="nav-button-link" onClick={() => handleNavClick('Dashboard')}>Dashboard</button></li>
        <li><button className="nav-button-link active">Clients</button></li>
        <li><button className="nav-button-link" onClick={() => handleNavClick('Projects')}>Projects</button></li>
        <li><button className="nav-button-link" onClick={() => handleNavClick('Contracts')}>Contracts</button></li>
      </ul>
      <div className="nav-right">
        <button className="user-profile">
          <FontAwesomeIcon icon={faUser} className="user-icon" onClick={() => handleNavClick('User Profile')}/> 
        </button>
        <button className="settings">
          <FontAwesomeIcon icon={faCog} className="settings-icon" onClick={() => handleNavClick('Settings')}/> 
        </button>
        <button className="logout-button" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
        </button>
        <div className="header-logo">
          <img src="/globaltech-logo-light.svg" alt="GlobalTech Logo" className="logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;