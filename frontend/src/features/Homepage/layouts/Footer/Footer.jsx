import React from 'react';
import './Footer.css';

const Footer = ({
  companyName,
  address,
  hotline,
  hours,
  website,
  legal,
  policySection,
  serviceSection,
  fanpage,
  copyright
}) => {
  return (
    <footer className="footer">
      <div className="company-info">
        <h1 className="company-name">{companyName}</h1>
        <p className="address">Address: {address}</p>
        <p className="hotline">Hotline: {hotline}</p>
        <p className="hours">Hours: {hours}</p>
        <p className="website">{website}</p>
        <p className="legal">{legal}</p>
      </div>
      <div className="links-section">
        <div className="column">
          <h3>{policySection.title}</h3>
          <ul>
            {policySection.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h3>{serviceSection.title}</h3>
          <ul>
            {serviceSection.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="fanpage-section">
          <h3>{fanpage.title}</h3>
          <div className="fanpage-box">
            <img src={fanpage.imageSrc} alt={fanpage.name} className="fanpage-image" />
            <p>{fanpage.name}</p>
            <p>{fanpage.followers}</p>
            <p>{fanpage.status}</p> {/* Assuming this is a status or additional text */}
          </div>
        </div>
      </div>
      <div className="copyright">{copyright}</div>
    </footer>
  );
};

export default Footer;