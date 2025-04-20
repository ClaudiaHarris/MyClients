import React from 'react';
import EditClientButton from './EditClientButton';


const ClientRowActions = ({ onEdit }) => {
  return (
    
      <div className="client-list-actions">
        <EditClientButton onClick={onEdit} />
      </div>
   
  );
};

export default ClientRowActions;