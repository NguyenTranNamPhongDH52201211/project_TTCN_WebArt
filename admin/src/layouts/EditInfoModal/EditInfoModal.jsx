// src/components/EditPersonalInfoModal.jsx
import React, { useState } from 'react';
import './EditInfoModal.css';
import Button from '../../components/Button/Button';

const EditInfoModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    facebook: 'https://www.facebook.com/PimjoHQ',
    x: 'https://x.com/PimjoHQ',
    linkedin: 'https://www.linkedin.com/company/pimj',
    instagram: 'https://instagram.com/PimjoHQ',
    firstName: 'Phong',
    lastName: 'Nam',
    email: 'phong121@gmail.com',
    phone: '+090931232',
    bio: 'Admin',
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
          <h2>Edit Personal Information</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <p className="modal-description">Update your details to keep your profile up-to-date.</p>

        <div className="section">
          <h3>Social Links</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Facebook</label>
              <input name="facebook" value={formData.facebook} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>X.com</label>
              <input name="x" value={formData.x} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Instagram</label>
              <input name="instagram" value={formData.instagram} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label>Bio</label>
              <input name="bio" value={formData.bio} onChange={handleChange} />
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

export default EditInfoModal;