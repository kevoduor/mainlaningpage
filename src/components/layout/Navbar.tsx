
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isXs, isSm } = useBreakpoint();
  const location = useLocation();
  
  // Check if the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-3'
  }`;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'FAQ', path: '/#faq' },
  ];
  
  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-nia-800 text-xl font-bold">
            nia
          </Link>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm hover:text-nia-600 transition-colors ${
                  (location.pathname === link.path || 
                   (link.path !== '/' && location.pathname.startsWith(link.path))) 
                    ? 'text-nia-600 font-medium' 
                    : 'text-nia-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* CTA button */}
          <div className="hidden md:block">
            <CTAButton 
              size="sm" 
              className="bg-nia-600 text-white"
              isBookDemo={true}
            >
              Book a Demo
            </CTAButton>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-nia-800"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base hover:text-nia-600 transition-colors py-2 ${
                  (location.pathname === link.path || 
                   (link.path !== '/' && location.pathname.startsWith(link.path))) 
                    ? 'text-nia-600 font-medium' 
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <CTAButton 
              className="mt-2" 
              isBookDemo={true}
              icon={false}
            >
              Book a Demo
            </CTAButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
