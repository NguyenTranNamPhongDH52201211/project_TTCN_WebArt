import React from 'react';
import './Header.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ logoText, searchPlaceholder, favoritesCount, cartCount }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {

    navigate('/');
  }

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>{logoText}</div>
      <SearchBar placeholder={searchPlaceholder} /> 
      <div className="icons">
        <Link to="/login">Đăng nhập</Link>
        <Link to="/profile" className="icon"><FaUser /></Link>
        <span className="icon with-badge">
          <FaHeart />
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </span>
        <span className="icon with-badge">
          <FaShoppingCart />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </span>
      </div>
    </header>
  );
}
