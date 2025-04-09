import React from 'react';

const ContactSection = ({ name, email, phone }) => {
  return (
    <div className="contact-section">
      <h3>Contact Information</h3>
      <div className="section-content">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
    </div>
  );
};

export default ContactSection;