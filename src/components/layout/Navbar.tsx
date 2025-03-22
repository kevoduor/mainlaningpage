
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserPlus } from 'lucide-react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isXs, isSm, isMd } = useBreakpoint();
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
  
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-padding-top ${
    isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-1.5 sm:py-2' : 'bg-transparent py-2 sm:py-3'
  }`;
  
  const handleScrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Features', path: '/#features', scrollTo: 'features' },
    { name: 'Pricing', path: '/#pricing', scrollTo: 'pricing' },
    { name: 'FAQ', path: '/#faq', scrollTo: 'faq' },
  ];
  
  // Updated Motia-inspired logo component with black color
  const MotiaLogo = () => (
    <div className="motia-logo">
      <span className="motia-m font-motia text-xl font-medium text-black">
        <span className="text-black">n</span>ia
      </span>
    </div>
  );
  
  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with updated color */}
          <Link to="/" className="text-black text-xl font-bold font-motia tracking-tight">
            <MotiaLogo />
          </Link>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            {navLinks.map((link) => {
              if (link.scrollTo && location.pathname === '/') {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={handleScrollToSection(link.scrollTo)}
                    className={`text-xs lg:text-sm hover:text-motia-600 transition-colors font-motia ${
                      (location.pathname === link.path || 
                       (link.path !== '/' && location.pathname.startsWith(link.path))) 
                        ? 'text-motia-600 font-medium' 
                        : 'text-motia-800'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs lg:text-sm hover:text-motia-600 transition-colors font-motia ${
                    (location.pathname === link.path || 
                     (link.path !== '/' && location.pathname.startsWith(link.path))) 
                      ? 'text-motia-600 font-medium' 
                      : 'text-motia-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          
          {/* CTA button */}
          <div className="hidden md:block">
            <CTAButton 
              size={isMd ? "sm" : "md"} 
              className="bg-motia-600 text-white shiny-button"
              href="/signup"
              icon={true}
            >
              Sign Up
            </CTAButton>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-motia-800 p-1"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 py-4 px-4 animate-fade-in safe-padding-top">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              if (link.scrollTo && location.pathname === '/') {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={handleScrollToSection(link.scrollTo)}
                    className={`text-base hover:text-motia-600 transition-colors py-2 font-motia ${
                      (location.pathname === link.path || 
                       (link.path !== '/' && location.pathname.startsWith(link.path))) 
                        ? 'text-motia-600 font-medium' 
                        : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base hover:text-motia-600 transition-colors py-2 font-motia ${
                    (location.pathname === link.path || 
                     (link.path !== '/' && location.pathname.startsWith(link.path))) 
                      ? 'text-motia-600 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <CTAButton 
              className="mt-2 shiny-button" 
              href="/signup"
              icon={false}
            >
              Sign Up
            </CTAButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
