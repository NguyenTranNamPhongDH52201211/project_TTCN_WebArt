// src/components/Profile.jsx
import React, { useState } from 'react';
import './UserProfilePage.css';
import ProfileCard from '../../layouts/ProfileCard/ProfileCard';
import InfoCard from '../../layouts/InfoCard/InfoCard';

import EditInfoModal from '../../layouts/EditInfoModal/EditInfoModal';
import EditAddressModal from '../../layouts/EditAddressModal/EditAddressModal'


const UserProfilePage = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [personalData, setPersonalData] = useState({
        // Initial data for personal info
        firstName: 'Phong',
        lastName: 'Nam',
        email: 'phong121@gmail.com',
        phone: '+0932323',
        bio: 'Admin',
        facebook: 'https://www.facebook.com/PimjoHQ',
        x: 'https://x.com/PimjoHQ',
        linkedin: 'https://www.linkedin.com/company/pimj',
        instagram: 'https://instagram.com/PimjoHQ',
    });
    const [addressData, setAddressData] = useState({
        country: 'Viet Nam',
        cityState: 'Ho Chi Minh,Viet Nam.',
        postalCode: '700000',
        taxId: '363636336',
    });
    const handleSavePersonal = (updatedData) => {
        setPersonalData(updatedData);
        // Optionally: Save to backend or local storage
    };
    const handleSaveAddress = (updatedData) => {
        setAddressData(updatedData);
    };
    return (
            <div className="profile-container">
                <h1>Profile</h1>
                <div className="breadcrumb">Home &gt; Profile</div>
                <ProfileCard
                    avatar="https://via.placeholder.com/48?text=M"
                    name="Nam Phong"
                    role="Admin"
                    location="Ho Chi Minh City, Viet Nam"
                    onEdit={() => setShowEditModal(true)}
                />
                <InfoCard
                    title="Personal Information"
                    fields={[
                        { label: 'First Name', value: 'Phong' },
                        { label: 'Last Name', value: 'Nam' },
                        { label: 'Email address', value: 'phongongp121@gmail.com' },
                        { label: 'Phone', value: '+007 1333 14' },
                        { label: 'Bio', value: 'Admin' },
                    ]}
                    onEdit={() => setShowEditModal(true)}
                />
                {showEditModal && (
                    <EditInfoModal
                        onClose={() => setShowEditModal(false)}
                        onSave={handleSavePersonal}
                        initialData={personalData}
                    />
                )}
                <InfoCard
                    title="Address"
                    fields={[
                        { label: 'Country', value: 'Viet Nam.' },
                        { label: 'City/State', value: 'Ho Chi Minh' },
                        { label: 'Postal Code', value: '70000' },
                        { label: 'TAX ID', value: '3636363636' },
                    ]}
                    onEdit={() => setShowAddressModal(true)}
                />
                {showAddressModal && (
                    <EditAddressModal
                        onClose={() => setShowAddressModal(false)}
                        onSave={handleSaveAddress}
                        initialData={addressData}
                    />
                )}
            </div>
    );
};

export default UserProfilePage;