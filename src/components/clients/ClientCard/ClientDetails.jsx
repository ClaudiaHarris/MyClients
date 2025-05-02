// src/components/clients/ClientCard/ClientDetails.jsx
import React from 'react';

const ClientDetails = ({ legal_name, street_address, city, state, postal_code, country }) => {
  return (
    <div className="client-details-section">
    
      <div className="section-content">
        <h2> {legal_name}</h2>
        <p> {street_address}</p>
        <p> {city}, {state} {postal_code}</p>
        <p> {country}</p>
        
      </div>
    </div>
  );
};

export default ClientDetails;