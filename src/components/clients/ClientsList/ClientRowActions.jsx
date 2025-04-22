import React from 'react';
import EditClientButton from './EditClientButton';
import DeleteClientButton from './DeleteClientButton'; // Assuming you have a DeleteClientButton component

const ClientRowActions = ({ onEdit, onDelete }) => {
  return (
    
      <div className="client-row-actions">
        <EditClientButton onClick={onEdit} />
        <DeleteClientButton onClick={onDelete} /> 
      </div>
   
  );
};

export default ClientRowActions;