// src/components/clients/ClientCard/SalesRepSection.jsx
import React from 'react';

const SalesRepSection = ({ name, rep_phone, rep_extension, region }) => {
  return (
    <div className="sales-rep-section">
      <div className="section-content">
        <p><strong>Sales Rep:</strong> {name || 'None assigned'}</p>
        {name && (
          <>
            <p><strong>Contact:</strong> {rep_phone}{rep_extension ? `, ext: ${rep_extension}` : ''}</p>
            {region && <p><strong>Region:</strong> {region}</p>}
          </>
        )}
      </div>
    </div>
  );
};
//TODO add sales rep to supabase
export default SalesRepSection;