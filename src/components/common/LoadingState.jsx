import React from 'react';
import PropTypes from 'prop-types';
import './LoadingState.css';

/**
 * Loading state component to show when content is loading
 * 
 * @param {Object} props - Component props
 * @param {string} [props.message='Loading...'] - Loading message to display
 * @param {string} [props.size='medium'] - Size of the loading indicator (small, medium, large)
 * @param {string} [props.className] - Additional CSS classes
 */
const LoadingState = ({ 
  message = 'Loading...', 
  size = 'medium',
  className = ''
}) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className={`loading-spinner spinner-${size}`}>
        <div className="spinner-inner"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

LoadingState.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default LoadingState;