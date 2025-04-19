import React from 'react';
import AddClientButton from '../../modal/AddClientButton';
import SearchBar from '../../common/SearchBar';

const ClientListActions = ({ onAddNew, searchValue, onSearchChange }) => {
  return (
    
      <div className="client-list-actions">
        <AddClientButton onClick={onAddNew} />
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>
   
  );
};

export default ClientListActions;