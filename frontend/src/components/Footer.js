import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Ek-Prayas</h3>
          <p>A student-led initiative working towards creating a better society through education, healthcare, and community service.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/initiatives">Our Initiatives</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get Involved</h4>
          <ul>
            <li><Link to="/contact">Join Us</Link></li>
            <li><Link to="/contact">Volunteer</Link></li>
            <li><Link to="/contact">Donate</Link></li>
            <li><Link to="/contact">Partner With Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><FaEnvelope /> ekprayas@example.com</li>
            <li><FaPhone /> +91 1234567890</li>
            <li><FaMapMarkerAlt /> Your College Name, City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ek-Prayas. All rights reserved.</p>
        <p>Made with ❤️ by Ek-Prayas Tech Team</p>
      </div>
    </footer>
  );
};

export default Footer;
