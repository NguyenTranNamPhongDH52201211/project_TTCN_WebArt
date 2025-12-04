// src/components/Button.jsx
import React from 'react';
import './Button.css';


const Button = ({ text, type = 'primary', icon, onClick }) => {
  return (
    <button className={`reusable-button ${type}`} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;