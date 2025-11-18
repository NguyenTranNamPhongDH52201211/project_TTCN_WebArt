import React from 'react';
import './SearchBar.css'; // Import your CSS file (create this file in the same directory)
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  return (
    <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm bạn mong muốn ..."
          className="search-input"
        />
      <div className="search-icon"><FaSearch className='icon'/></div>
    </div>
  );
};

export default SearchBar;
