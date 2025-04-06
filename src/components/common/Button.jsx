import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Reusable Button component with different variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary, danger, success)
 * @param {string} [props.size='medium'] - Button size (small, medium, large)
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler function
 * @param {string} [props.type='button'] - Button type attribute
 */


const Button = ({ 
  variant = 'primary',
  size = 'medium', 
  disabled = false,
  className='',
  children,
  onClick,
  type = 'button',
  ...restProps 
}) => {
  const buttonClasses = `
  btn
  btn-${variant}
  btn-${size}
  ${disabled ? 'btn-disabled' : ''}
  ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;