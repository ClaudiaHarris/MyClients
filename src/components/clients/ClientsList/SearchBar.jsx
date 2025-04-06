import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="search-input"
      />
      {value && (
        <button
          className="clear-search"
          onClick={() => onChange('')}
          aria-label="Clear search">
            x
          </button>
      )}
      <span className="search-icon">🔍</span>
      
    </div>
  );
};
export default SearchBar;