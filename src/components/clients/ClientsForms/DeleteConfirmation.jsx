import React from "react";  
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import {useClientContext} from '../../../contexts/ClientContext';

/**
 * DeleteConfirmation component
 * A modal dialog that confirms if the user wants to delete a client
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {Object} props.client - The client to be deleted
 */

 const DeleteConfirmation = ({ isOpen, onClose, client}) => {
  const {removeClient} = useClientContext();

  //if !client, don't render anything

  if (!client) {
    return null;
  }

  const handleDelete = async () => {
    try {
      //call the context function to delete the client
      await removeClient(client.id);

      //close the modal after successful deletion
      onClose();
    
    } catch (error) {
      console.error('Error deleting client', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-confirmation">
        <h2>Confirm Deletion</h2>

        <p> Are you sure you want to delete <strong>{client.name}</strong>? </p>

        <p className="warning-text">This action cannot be undone.</p>

        <div className="button-group">
          <Button
            onClick={onClose}
            className="cancel-button"
          >Cancel</Button>

          <Button
            onClick={handleDelete}
            className="delete-button"
          >Delete Client</Button>

        </div>
      </div>
    </Modal>
  );
 };

 export default DeleteConfirmation;
 