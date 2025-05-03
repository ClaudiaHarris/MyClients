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