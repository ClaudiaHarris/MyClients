import React, {useEffect, useRef} from 'react';
import './Modal.css';

/**
 * Reusable Modal component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls whether the modal is displayed
 * @param {function} props.onClose - Function to call when the modal is closed
 * @param {string} props.title - Modal title text
 * @param {React.ReactNode} props.children - Content to display in the modal body
 * @param {string} props.size - Size of modal ('small', 'medium', 'large')
 * @param {boolean} props.showCloseButton - Whether to show the X close button
 * @returns {React.ReactNode}
 */

 const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size='medium',
  showCloseButton = true,
 }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    
    //close if click outside modal
    const handleOutsideClick = (event) => {
      onClose();
      
    };

    //close with escape key
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    //only add event listener if modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    //clean up event listeners when modal closes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
}, [isOpen, onClose]);

 //don't render if modal is closed
 if (!isOpen) {
  return null;
 }

 return (
    <div className="modal-overlay">
      <div
        className={`modal-container modal-${size}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>

          {showCloseButton && (
            <button
              className="modal-close-button"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          )}
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
 );
};

export default Modal;