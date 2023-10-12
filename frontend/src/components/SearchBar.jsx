import React from 'react';
import "../styles/SearchBar.css"; 

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
