// src/components/ReusableSearchInput.jsx
import React from 'react';
import './SearchBar.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ placeholder = 'Search...', width = '300px', onChange }) => {
  return (
    <div className="search-container" style={{ width }}>
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;