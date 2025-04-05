import React from 'react';
import './MainLayout.css';
import Navbar from './Navbar'; 

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
    
      <main className="content-container">{children}</main>
      <footer className="footer">GlobalTech Solutions CRM 2025, All Rights Reserved. </footer>
    </div>
  );
};

export default MainLayout;