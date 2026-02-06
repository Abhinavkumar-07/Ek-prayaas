import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo.png"
                alt="Ek-Prayas Logo"
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/40';
                }}
              />
              <h3 className="text-xl font-bold">Ek-Prayas</h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Together, we can change lives one step at a time. Join us in making a difference through education, elderly care, and community service.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/initiatives" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Our Initiatives
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/get-involved" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Sponsor an Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span className="text-neutral-400">
                  College Campus, City Name, State - 123456
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a href="mailto:contact@ekprayas.com" className="text-neutral-400 hover:text-primary transition-colors">
                  contact@ekprayas.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <FaPhone className="text-primary flex-shrink-0" />
                <a href="tel:+911234567890" className="text-neutral-400 hover:text-primary transition-colors">
                  +91 12345 67890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-neutral-500 text-sm">
              © {currentYear} Ek-Prayas. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-neutral-500 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-500 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
