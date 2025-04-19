import React from 'react';
import Navbar from '../layout/Navbar';

const PageHeader = ({ title }) => {
  
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      <Navbar />
    </div>
  );
};

export default PageHeader;