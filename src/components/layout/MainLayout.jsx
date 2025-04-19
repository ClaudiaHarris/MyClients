// src/components/layout/MainLayout.jsx
import React from 'react';
import './MainLayout.css'; // Import your CSS file for styling
import Footer from './Footer';
import PageHeader from '../common/PageHeader';
import Breadcrumb from './Breadcrumb';


const MainLayout = ({ children, pageTitle }) => {

  return (
    <div className="main-layout">

      <div className="mainlayout-header">
        <Breadcrumb /> 
        <PageHeader title={pageTitle} />
      </div>

      <main className="main-content">
        {children}
      </main>

      <div className="mainlayout-footer">
        <Footer />
      </div>

    </div>  
  );
};


export default MainLayout;