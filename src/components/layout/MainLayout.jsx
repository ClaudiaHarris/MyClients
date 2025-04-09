// src/components/layout/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="header-logo">
        <img src="/globaltech-logo.webp" alt="GlobalTech Logo" className="logo" />
      </div>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;