//TODO: add button CSS?
import React from 'react';
import './Button.css'; // Import your CSS file for styling
const Button = ({ children, onClick, variant = 'primary', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;