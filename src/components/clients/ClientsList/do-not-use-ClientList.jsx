// src/components/clients/ClientList/ClientList.jsx
import React, { useState } from 'react';
import ClientRow from './ClientRow';
import SearchBar from './SearchBar';
import Button from '../../common/Button';

const ClientList = ({ clients, onClientSelect, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

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
      <div className="client-list-header">
        <h2>Clients</h2>
        <Button onClick={onAddNew}>Add New Client</Button>
      </div>
      
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      
      <div className="client-table-container">
        <table className="client-table">
          <thead>
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
                Lifecycle Stage
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
                onSelect={() => onClientSelect(client)} 
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