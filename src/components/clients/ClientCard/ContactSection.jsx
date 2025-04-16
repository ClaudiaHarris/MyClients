import React from 'react';

const ContactSection = ({ name, email, phone, ext }) => {
  return (
    <div className="contact-section">
      
      <div className="section-content">
        <p><strong> {name}</strong></p>
        <p> {phone} ext:{ext}</p>
        <p> <span><a href={`mailto:${email}`}>{email}</a>
          <div className="client-card-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
            </span></p>
        
      </div>
    </div>
  );
};

export default ContactSection;