// src/components/InfoCard.jsx
import React from 'react';
import './InfoCard.css';
import EditButton from '../../components/EditButton/EditButton';

const InfoCard = ({ title, fields, onEdit}) => {
  return (
    <div className="info-card">
      <div className="card-header">
        <h3>{title}</h3>
        <EditButton onClick={onEdit} />
      </div>
      <div className="card-content">
        {fields.map((field, index) => (
          <div key={index} className="field-row">
            <label>{field.label}</label>
            <p><strong>{field.value}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;