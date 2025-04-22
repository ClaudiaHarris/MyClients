import React from 'react';

const ContactSection = ({ contact_name, contact_email, contact_title, contact_phone, contact_ext }) => {
  return (
    <div className="contact-section">
      
      <div className="section-content">
        <p><strong> {contact_name}</strong>, title: {contact_title}</p>
        <p> {contact_phone} ext:{contact_ext}</p>
        <div> <span><a href={`mailto:${contact_email}`}>{contact_email}</a>
        
          <div className="client-card-actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
            </span></div>
        
      </div>
    </div>
  );
};

export default ContactSection;