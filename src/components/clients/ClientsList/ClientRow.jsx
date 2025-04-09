// src/components/clients/ClientList/ClientRow.jsx
import React from 'react';

const ClientRow = ({ client, onSelect }) => {
  return (
    <tr onClick={onSelect} className="client-row">
      <td>{client.name}</td>
      <td>{client.contactName}</td>
      <td>
        <span className={`lifecycle-stage ${client.lifecycleStage}`}>
          {client.lifecycleStage}
        </span>
      </td>
      <td>{client.salesRep}</td>
      <td>{client.office}</td>
      <td>{client.email}</td>
      <td className="actions">
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row selection
            onSelect(client); // Select the client first
            // Here you would open edit modal in a real app
            alert(`Edit ${client.name}`); 
          }}
          className="edit-btn"
        >
          Edit
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row selection
            // Here you would show delete confirmation in a real app
            alert(`Delete ${client.name}`);
          }}
          className="delete-btn"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;