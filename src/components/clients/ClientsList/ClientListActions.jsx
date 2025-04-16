import React from 'react';
import AddClientButton from './AddClientButton';
import SearchBar from './SearchBar';

const ClientListActions = ({ onAddNew, searchValue, onSearchChange }) => {
  return (
    
      <div className="client-list-actions">
        <AddClientButton onClick={onAddNew} />
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>
   
  );
};

export default ClientListActions;