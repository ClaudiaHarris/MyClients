// src/components/clients/ClientCard/SalesRepSection.jsx
import React from 'react';

const SalesRepSection = ({ name, office, email, phone }) => {
  return (
    <div className="sales-rep-section">
      
      <div className="section-content">
        <p><strong>Sales Rep:</strong> {name || 'None assigned'}</p>
        {name && (
          <>
            <p><strong>Office:</strong> {office}</p>
            <p><strong>Contact:</strong> <a href={`mailto:${email}`}>{email}</a> | {phone}</p>
          </>
        )}
      </div>
    </div>
  );
};


export default SalesRepSection;