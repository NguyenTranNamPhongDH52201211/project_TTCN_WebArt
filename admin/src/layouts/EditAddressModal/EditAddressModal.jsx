// src/components/EditAddressModal.jsx
import React, { useState } from 'react';
import './EditAddressModal.css'; // Reuse the same CSS file
import Button from '../../components/Button/Button';

const EditAddressModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    country: 'Viet Nam',
    cityState: 'Ho Chi Minh , Viet Nam.',
    postalCode: '700000',
    taxId: '3636363636',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Address</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <p className="modal-description">Update your details to keep your profile up-to-date.</p>

        <div className="section">
          <h3>Address</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Country</label>
              <input name="country" value={formData.country} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>City/State</label>
              <input name="cityState" value={formData.cityState} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>TAX ID</label>
              <input name="taxId" value={formData.taxId} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button text="Close" type="secondary" onClick={onClose} />
          <Button text="Save Changes" type="primary" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;