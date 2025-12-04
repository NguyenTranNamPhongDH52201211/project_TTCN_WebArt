// src/components/ProfileCard.jsx
import React from 'react';
import './ProfileCard.css';
import EditButton from '../../components/EditButton/EditButton';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiGrid} from 'react-icons/fi';


const ProfileCard = ({ avatar, name, role, location ,onEdit}) => {
    return (
            <div className="profile-card">
                <div className="profile-info">
                    <img src={avatar} alt={name} className="avatar" />
                    <div className="details">
                        <h2>{name}</h2>
                        <p>{role} | {location}</p>
                    </div>
                </div>
                <div className="social-icons">
                    <FiFacebook className="social-icon" />
                    <FiTwitter className="social-icon" />
                    <FiLinkedin className="social-icon" />
                    <FiInstagram className="social-icon" />
                </div>
                <EditButton onClick={onEdit} />
            </div>
    );
};

export default ProfileCard;