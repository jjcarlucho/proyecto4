import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gauge } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Demo', path: '/demo' },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Gauge className="h-8 w-8 text-primary-800" />
          <span className="font-heading font-bold text-xl md:text-2xl text-primary-800">
            AutoDiagnose AI
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-primary-800'
                  : 'text-gray-600 hover:text-primary-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="btn btn-outline !py-2"
          >
            Login
          </Link>
          <Link
            to="/demo"
            className="btn btn-primary !py-2"
          >
            Start Free Trial
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white absolute top-full left-0 right-0 shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium py-2 ${
                location.pathname === link.path
                  ? 'text-primary-800'
                  : 'text-gray-600'
              }`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/login"
              className="btn btn-outline w-full text-center"
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link
              to="/demo"
              className="btn btn-primary w-full text-center"
              onClick={closeMenu}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;