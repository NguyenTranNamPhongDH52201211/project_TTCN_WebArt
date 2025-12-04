import './Header.css';
import { FiMenu, FiSearch, FiMoon, FiBell, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      {/* Left side */}
      <div className="header-left">
       <div className="iconMenu"><FiMenu className="icon"  /></div> 
        <div className="search-container">
          <input
            type="text"
            placeholder="Search or type command..."
            className="search-input"
          />
          <FiSearch className="search-icon" />
        </div>
        
      </div>

      {/* Right side */}
      <div className="header-right">
        <FiMoon className="icon" />
        <FiBell className="icon" />
        <div className="profile" onClick={toggleDropdown}>
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="profile-img"
          />
          <span className="profile-name">Phong</span>
          <FiChevronDown className="icon" />
        </div>

        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-header">
              <p className="dropdown-name">Nam Phong</p>
              <p className="dropdown-email">phongnam@gmail.com</p>
            </div>
            <ul className="dropdown-menu">
              <li>Edit profile</li>
              <li>Account settings</li>
              <li>Support</li>
              <li className="sign-out">Sign out</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;