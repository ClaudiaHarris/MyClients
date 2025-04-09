// src/components/clients/ClientCard/ClientDetails.jsx
import React from 'react';

const ClientDetails = ({ name, address, website }) => {
  return (
    <div className="client-details-section">
      <h3>Client Details</h3>
      <div className="section-content">
        <p><strong>Legal Name:</strong> {name}</p>
        <p><strong>Main Address:</strong> {address}</p>
        <p><strong>Website:</strong> <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</a></p>
      </div>
    </div>
  );
};

export default ClientDetails;