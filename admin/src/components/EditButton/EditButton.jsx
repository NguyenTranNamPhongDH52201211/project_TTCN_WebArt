// src/components/ReusableEditButton.jsx
import React from 'react';
import './EditButton.css';
import { FiEdit } from 'react-icons/fi';

const ReusableEditButton = ({ onClick }) => {
  return (
    <button className="reusable-edit-button" onClick={onClick}>
      <FiEdit className="edit-icon" />
      Edit
    </button>
  );
};

export default ReusableEditButton;