import React from 'react';
import Button from '../../common/Button';

const SalesRepSection = ({salesRep}) => {

  if (!salesRep) {

    return (
      <div className="card-section sales-rep-section">

        <div className="section-header">
          <h3>Assigned Account Executive</h3>
          <Button className="assign-button">Assign</Button>
        </div>

        <div className="section-content">
          <p className="no-data-message">No account executive assigned.</p>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    //TODO use state to implement open edit modal
    console.log('Change sales rep assignment');
  };

  return (
    <div className="card-section sales-rep-section">

      <div className="section-header">
        <h3>Account Executive</h3>
        <Button onClick={handleEdit} className="edit-button">Change</Button>
      </div>

      <div className="section-content">

        <div className="info-row">
          <span className="info-label">Name:</span>
          <span className="info-value">{salesRep.name}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Office:</span>
          <span className="info-value">{salesRep.office}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Email:</span>
          <span className="info-value">
            <a href={`mailto:$salesRep.email}`}>{salesRep.email}</a></span>
        </div>

        {salesRep.phone && (
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{salesRep.phone}
              {salesRep.extension && `ext. ${salesRep.extension}`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesRepSection;

  
