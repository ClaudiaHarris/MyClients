import React from 'react';
import ClientRowActions from './ClientRowActions';

const ClientRow = ({ client, onSelect, onEdit, onDelete }) => {

  return (
    <tr onClick={() => onSelect(client)} className="client-row">
      <td>{client.client_id}</td>
      <td>{client.legal_name}</td>
      <td>{client.contact_name}</td>
      <td>
        <span className={`lifecycle-stage ${client.lifecycle}`}>
          {client.lifecycle}
        </span>
      </td>
      <td>{client.sales_rep}</td>
      <td>{client.office}</td>
      <td>{client.contact_email}</td>

      <td className="client-row-actions">
        <ClientRowActions 
          onEdit={e => {
            e.stopPropagation(); // Prevent row selection
            onEdit(client);
          }}
          onDelete={e => {
            e.stopPropagation(); // Prevent row selection
            onDelete(client);
          }}
        />
      </td>
    </tr>
  );
};
export default ClientRow;