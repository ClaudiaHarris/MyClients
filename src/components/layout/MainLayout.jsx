// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="header-logo">
        <img src="/globaltech-logo-light.svg" alt="GlobalTech Logo" className="logo" />
      </div>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
export default MainLayout;