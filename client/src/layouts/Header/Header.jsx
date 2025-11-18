import React from 'react';
import './Header.css';
import SearchBar from '../../components/SearchBar/SearchBar'; // Import the SearchBar component (assuming it's in the same directory or adjust path)
import {FaUser, FaHeart, FaShoppingCart} from "react-icons/fa";
export default function Header ({ logoText, searchPlaceholder, favoritesCount, cartCount })  {
  return (
    <header className="header">
      <div className="logo">{logoText}</div>
      <SearchBar placeholder={searchPlaceholder} /> 
      <div className="icons">
        <span className="icon">{<FaUser />}</span>
        <span className="icon with-badge">
          {<FaHeart />}
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </span>
        <span className="icon with-badge">
          {<FaShoppingCart />}
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </span>
      </div>
    </header>
  );
};

