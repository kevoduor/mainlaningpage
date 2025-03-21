
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nia-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-xl font-bold mb-4">
              <a href="https://heynia.com" target="_blank" rel="noopener noreferrer" className="hover:text-nia-400 transition-colors">
                <span className="text-nia-400">nia</span>.
              </a>
            </div>
            <p className="text-nia-200 mb-4 max-w-xs">
              AI-powered dental clinic management system that helps attract more patients, reduce no-shows, and automate operations.
            </p>
            <div className="flex items-center space-x-1 text-nia-300 mb-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+254755792377" className="ml-2 hover:text-white transition-colors">+254 755 792 377</a>
            </div>
            <div className="flex items-center space-x-1 text-nia-300">
              <Mail className="h-4 w-4" />
              <a href="mailto:hello@heynia.com" className="ml-2 hover:text-white transition-colors">hello@heynia.com</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">E-Books</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Free Tools</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Comparisons</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Nia vs Dentrix</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Nia vs Open Dental</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Nia vs Eaglesoft</Link></li>
              <li><Link to="/" className="text-nia-300 hover:text-white transition-colors">Best Dentrix Alternative</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-nia-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-nia-400 text-sm mb-4 md:mb-0">
              © {currentYear} <a href="https://heynia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Nia</a>. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://heynia.com/terms" target="_blank" rel="noopener noreferrer" className="text-nia-400 hover:text-white transition-colors">Terms</a>
              <a href="https://heynia.com/privacy" target="_blank" rel="noopener noreferrer" className="text-nia-400 hover:text-white transition-colors">Privacy</a>
              <a href="https://heynia.com/cookies" target="_blank" rel="noopener noreferrer" className="text-nia-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
