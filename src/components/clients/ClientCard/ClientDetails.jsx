// src/components/clients/ClientCard/ClientDetails.jsx
import React from 'react';

const ClientDetails = ({ name, address, website }) => {
  return (
    <div className="client-details-section">
    
      <div className="section-content">
        <h2> {name}</h2>
        <p> {address}</p>
        <p><span> 
          <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</a>
          <div className="client-card-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
            <button className="archive-btn">Archive</button>
          </div>
        </span></p>
      </div>
    </div>
  );
};

export default ClientDetails;