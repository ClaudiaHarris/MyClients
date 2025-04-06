import React, { useState } from 'react';
import { useClientContext } from '../../../contexts/ClientContext';
import './ClientList.css';
import LoadingState from '../../common/LoadingState';
import Button from '../../common/Button';
import SearchBar from './SearchBar';
import ClientRow from './ClientRow';

const ClientList = ({ onClientSelect, onAddNew }) => {
  const { clients, loading, error } = useClientContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle loading and error states
  if (loading) return <div className="loading-state">Loading clients...</div>;
  if (error) return <div className="error-state">{error}</div>;
  
  // Ensure clients is an array
  const clientsList = clients || [];

  // Filter clients based on search term
  const filteredClients = clientsList.filter(client => 
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

  // Handle sort column click
  const handleSort = (field) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a new field, set it and default to ascending
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
      
      {/* Search bar component */}
      <SearchBar 
        value={searchTerm} 
        onChange={setSearchTerm} 
        placeholder="Search by client or contact name..."
      />
      
      <div className="client-table-container">
        <table className="client-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Client Name
                {sortField === 'name' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('contactName')}>
                Contact
                {sortField === 'contactName' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('lifecycleStage')}>
                Lifecycle Stage
                {sortField === 'lifecycleStage' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('salesRep')}>
                Sales Rep
                {sortField === 'salesRep' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('office')}>
                Office
                {sortField === 'office' && (
                  <span className="sort-icon">
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.length > 0 ? (
              sortedClients.map(client => (
                <ClientRow 
                  key={client.id} 
                  client={client} 
                  onSelect={() => onClientSelect(client)} 
                />
              ))
            ) : (
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