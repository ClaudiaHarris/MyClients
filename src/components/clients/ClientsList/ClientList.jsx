import React, { useState } from 'react';
import ClientRow from './ClientRow';
import './ClientList.css'; // Import your CSS file for styling

const ClientList = ({ clients, onClientSelect, onAddNew, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState('legal_name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter clients based on search term
  const searchTermLower = searchTerm.toLowerCase();
  const filteredClients = (clients || []).filter(client => {
    if (!client) return false;
    return String(client.legal_name || '').toLowerCase().includes(searchTermLower) ||
           String(client.contact_name || '').toLowerCase().includes(searchTermLower);
  });

  // Sort clients based on sort field and direction
  const sortedClients = [...filteredClients].sort((a, b) => {
    const aValue = (a[sortField] || '').toLowerCase();
    const bValue = (b[sortField] || '').toLowerCase();
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handler for editing a client
  const handleEdit = (client) => {
    if (onEdit) {
      onEdit(client);
    } else {
      // Default: log or alert
      alert(`Edit client: ${client.legal_name}`);
    }
  };

  const handleDelete = (client) => {
    if (onDelete) {
      onDelete(client);
    } else {
      alert(`Delete client: ${client.legal_name}`);
    }
  };

  return (
    <div className="client-list">
      <div className="client-table-container">
        <table className="client-table">

          <thead >
            <tr>
             
              <th onClick={() => handleSort('legal_name')}>
                Client Name
                {sortField === 'legal_name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('contact_name')}>
                Contact
                {sortField === 'contact_name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('lifecycle')}>
                Lifecycle
                {sortField === 'lifecycle' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedClients.map(client => (
              <ClientRow 
                key={client.client_id}
                client={client} 
                onSelect={onClientSelect} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            {sortedClients.length === 0 && (
              <tr>
                <td colSpan="7" className="no-clients-message">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;