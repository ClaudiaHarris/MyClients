// TODO: do I want to import CSS?

import React, { useState } from 'react';
import ClientRow from './ClientRow';
import './ClientList.css'; // Import your CSS file for styling

const ClientList = ({ clients, onClientSelect, onAddNew }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort clients based on sort field and direction
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
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



  return (
    <div className="client-list">
      <div className="client-table-container">
        <table className="client-table">
          <thead className="client-table-header">
            <tr>
              <th onClick={() => handleSort('name')}>
                Client Name
                {sortField === 'name' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('contactName')}>
                Contact
                {sortField === 'contactName' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('lifecycleStage')}>
                Lifecycle
                {sortField === 'lifecycleStage' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('salesRep')}>
                Sales Rep
                {sortField === 'salesRep' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th onClick={() => handleSort('office')}>
                Office
                {sortField === 'office' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map(client => (
              <ClientRow 
                key={client.id} 
                client={client} 
                onSelect={onClientSelect} 
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