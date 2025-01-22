import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>CAR RENTAL.</p>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Phone: +254 799 913 533</p>
          <p>Email: info@carrental.com</p>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Car Rental. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
