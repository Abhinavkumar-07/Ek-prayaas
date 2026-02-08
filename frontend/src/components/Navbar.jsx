import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Initiatives', path: '/initiatives' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-primary py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Ek-Prayas Logo"
              className="h-12 w-12 object-contain"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/48'; }}
            />
            <div className="flex flex-col">
              <span className={`text-2xl font-bold tracking-tight ${
                scrolled ? 'text-primary' : 'text-white'
              }`}>
                Ek-Prayas
              </span>
              <span className={`text-xs ${
                scrolled ? 'text-neutral-600' : 'text-white/80'
              }`}>
                One Step at a Time
              </span>
            </div>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === link.path
                    ? scrolled ? 'bg-primary text-white' : 'bg-white text-primary'
                    : scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/20'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!token ? (
              <Link to="/login" className={`px-4 py-2 rounded-lg font-medium transition-all ${
                scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/20'
              }`}>
                Login
              </Link>
            ) : (
              <button
                onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  scrolled ? 'text-red-600 hover:bg-neutral-100' : 'text-white hover:bg-white/20'
                }`}
              >
                Logout
              </button>
            )}

            <Link to="/get-involved" className={`ml-4 px-6 py-2 rounded-lg font-medium transition-all ${
              scrolled ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-primary hover:bg-neutral-100'
            }`}>
              Donate
            </Link>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              scrolled ? 'text-neutral-700' : 'text-white'
            }`}
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* --- MOBILE MENU (FIXED!) --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-2">
                
                {/* 1. Login/Logout Button */}
                {!token ? (
                  <Link
                    to="/login"
                    className={`px-4 py-3 rounded-lg font-medium ${
                      // FIX: If scrolled, text becomes DARK. If top, text is WHITE.
                      scrolled 
                        ? 'text-neutral-700 hover:bg-neutral-100' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => { localStorage.removeItem('token'); setToken(null); window.location.href = '/login'; }}
                    className={`px-4 py-3 rounded-lg font-medium text-left ${
                      scrolled 
                        ? 'text-red-600 hover:bg-neutral-100' 
                        : 'text-red-200 hover:bg-white/20'
                    }`}
                  >
                    Logout
                  </button>
                )}

                {/* 2. Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      location.pathname === link.path
                        // Active State
                        ? scrolled 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-primary'
                        // Inactive State (FIXED HERE)
                        : scrolled 
                          ? 'text-neutral-700 hover:bg-neutral-100' // Dark text when scrolled
                          : 'text-white hover:bg-white/20'          // White text when at top
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* 3. Donate Button */}
                <Link
                  to="/get-involved"
                  className={`mt-2 px-4 py-3 rounded-lg font-medium text-center ${
                    scrolled 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-primary'
                  }`}
                >
                  Donate Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;