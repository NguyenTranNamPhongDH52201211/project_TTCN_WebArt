import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';
import { SearchContext } from "../../../../context/SearchContext";
const SearchBar = ({ placeholder }) => {
  const { setKeyword } = useContext(SearchContext);
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setKeyword(input); // cập nhật keyword toàn cục
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="search-input"
      />
      <div className="search-icon" onClick={handleSearch}>
        <FaSearch className="icon"/>
      </div>
    </div>
  );
};

export default SearchBar;
