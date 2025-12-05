import React from 'react';
import './Footer.css';

const Footer = ({
  logo,
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
      <div className="footer-container">

        {/* Cột 1: Logo + thông tin công ty */}
        <div className="footer-col">
          <img src={logo} alt="Company Logo" className="footer-logo" />

          <p className="footer-text">📍 {address}</p>
          <p className="footer-text">📞 {hotline}</p>
          <p className="footer-text">⏰ {hours}</p>
          <p className="footer-text">{website}</p>
          <p className="footer-legal">{legal}</p>
        </div>

        {/* Cột 2: Thông tin & Chính sách */}
        <div className="footer-col">
          <h3>{policySection.title}</h3>
          <ul>
            {policySection.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Dịch vụ */}
        <div className="footer-col">
          <h3>{serviceSection.title}</h3>
          <ul>
            {serviceSection.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Cột 4: Fanpage */}
        <div className="footer-col">
          <h3>{fanpage.title}</h3>
          <div className="fanpage-box">
            <img src={fanpage.imageSrc} alt={fanpage.name} className="fanpage-image" />
            <div className="fanpage-info">
              <p className="fanpage-name">{fanpage.name}</p>
              <p className="fanpage-followers">{fanpage.followers}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-copy">
        {copyright}
      </div>
    </footer>
  );
};

export default Footer;
