import React from 'react';
import './Category.css';


export default function Category ({ menuItems }) {
  return (
    <div className="product-menu">
      <div className="menu-header">
        <span className="hamburger-icon">≡</span>
        DANH MỤC SẢN PHẨM
      </div>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <span className="item-icon">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

