import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by client or contact name..."
        className="search-input"
      />
      {value && (
        <button 
          className="clear-search-btn"
          onClick={() => onChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;