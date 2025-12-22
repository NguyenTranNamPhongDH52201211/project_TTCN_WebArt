import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Sidebar.css';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Sidebar = ({
  logoIcon,
  logoText = 'WebArt',
  menuLabel = 'MENU',
  menuItems = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "Products",
      subitems: [
        { text: "All Products", path: "/productpage" },
        { text: "Add New Product", path: "/addproductpage" },
      ]
    },
    {
      text: "Order",
      subitems: [
        { text: "All Order", path: "/orderpage" },
      ]
    },
     {
      text: "User",
      subitems: [
        { text: "All User", path: "/userpage" },
      ]
    },
    {
      text: "User Profile",
      path: "/userprofilepage",
    }
  ],
}) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="sidebar">
      <div className="logo">
        {logoIcon}
        <span className="logo-text">{logoText}</span>
      </div>

      <div className="menu-label">{menuLabel}</div>

      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>

            <li className="menu-item">

              {item.path ? (
                <Link to={item.path} className="menu-text">
                  {item.text}
                </Link>
              ) : (
                <span 
                  className="menu-text"
                  onClick={(e) => toggleExpand(index, e)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.text}
                </span>
              )}

              {item.subitems && (
                <span onClick={(e) => toggleExpand(index, e)} style={{ cursor: 'pointer' }}>
                  {expandedItems[index] ? (
                    <FiChevronUp className="chevron" />
                  ) : (
                    <FiChevronDown className="chevron" />
                  )}
                </span>
              )}
            </li>

            {item.subitems && expandedItems[index] && (
              item.subitems.map((sub, subIndex) => (
                <li key={subIndex} className="submenu-item">
                  <Link to={sub.path} className="menu-text">{sub.text}</Link>
                </li>
              ))
            )}

          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;