import React from 'react';
import Button from '../../common/Button';

const ClientDetails = ({client}) => {
  const handleEdit = () => {                //open edit modal
    
    console.log('Edit client details:', client.id); //TODO
  };

  return (

    <div className="card-section client-details-section"> 

      <div className="section-header">
        <h3>Business Information</h3>
        <Button onClick={handleEdit} className="edit-button">Edit</Button>
      </div>

      <div className="section-content">

        <div className="info-row">
          <span className="info-label">Legal Name:</span>
          <span className="info-value">{client.name}</span>
        </div>

        <div className="info-row">
          <span className="info-label">ClientID:</span>
          <span className="info-value">{client.clientId}</span> {/* TODO change clientNumber to clientId */}
        </div>

        <div className="info-row">
          <span className="info-label">Lifecycle:</span>
          <span className="info-value">{client.lifecycleStage}</span> {/* TODO change clientNumber to clientId */}
        </div>

        <div className="info-row">
          <span className="info-label">Main Address:</span>
          <span className="info-value">{client.address}, {client.country}</span> {/* TODO change clientNumber to clientId */}
        </div>

        {client.website && (
          <div className="info-row">
            <span className="info-label">Website:</span>
            <span className="info-value">
              <a href={client.website} target="_blank" rel="noopener noreferrer">
                {client.website}
              </a>
            </span>
          </div>
        )}
      </div>
    </div>

  );
};

export default ClientDetails;