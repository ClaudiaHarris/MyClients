//this displays information about the contact person at the client company
import React from 'react';
import Button from '../../common/Button';

const ContactSection = ({contact}) => {
  
  if (!contact) {
    
    return (
      <div className="card-section contact-section">

        <div className="section-header">
          <h3>Contact Information</h3>
          <Button className="add-button">Add Contact</Button>
        </div>

        <div className="section-content">
          <p className="no-data-message">No contact information available</p>
        </div> 
      </div>
    );
  }

  const handleEdit = () => {
    //TODO to open the edit modal with state from context (or props)
    console.log('Edit contact:', contact.id);
  };

  return (
    <div className="card-section contact-section">

      <div className="section-header">
        <h3>Contact Information</h3>
        <Button onClick={handleEdit} className="edit-button">Edit</Button>
      </div>

      <div className="section-content">

        <div className="info-row">
          <span className="info-label">Name:</span>
          <span className="info-value">{contact.name}</span>
        </div>

        {contact.title && (
          <div className="info-row">
            <span className="info-label">Title:</span>
            <span className="info-value">{contact.title}</span>
        </div>
        )}

        <div className="info-row">
          <span className="info-label">Phone:</span>
          <span className="info-value">
            {contact.phone} {contact.extension && `ext. ${contact.extension}`}
          </span>
        </div>

        <div className="info-row">
          <span className="info-label">Email:</span>
          <span className="info-value">
            <a href={`mailto:${contact.email}`}>
            {contact.email}</a>
          </span>
        </div>
      </div>
    </div>

  );
};

export default ContactSection;