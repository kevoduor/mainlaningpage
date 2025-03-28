
import React from 'react';
import { Link } from 'react-router-dom';
import { useBreakpoint } from '@/hooks/use-mobile';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isMobile } = useBreakpoint();

  return (
    <footer className="bg-slack-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-xl font-bold mb-4">
              <Link to="/" className="hover:text-slack-400 transition-colors">
                <span className="text-slack-400">nia</span>.
              </Link>
            </div>
            <p className="text-slack-200 mb-4 max-w-xs">
              AI-powered dental clinic management system that helps attract more patients, reduce no-shows, and automate operations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/blog" className="text-slack-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/blog/marketing-tips-attract-patients" className="text-slack-300 hover:text-white transition-colors">Marketing Tips</Link></li>
              <li><Link to="/blog/ai-transform-dental-practice" className="text-slack-300 hover:text-white transition-colors">AI in Dentistry</Link></li>
              <li><Link to="/blog/technology-dental-practice" className="text-slack-300 hover:text-white transition-colors">Technology Guide</Link></li>
              <li><Link to="/blog/creative-dental-marketing-ideas" className="text-slack-300 hover:text-white transition-colors">Creative Marketing</Link></li>
              <li><Link to="/blog/digital-marketing-dental-clinics" className="text-slack-300 hover:text-white transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Comparisons</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Nia vs Dentrix</Link></li>
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Nia vs Open Dental</Link></li>
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Nia vs Eaglesoft</Link></li>
              <li><Link to="/" className="text-slack-300 hover:text-white transition-colors">Best Dentrix Alternative</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slack-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slack-400 text-sm mb-4 md:mb-0">
              © {currentYear} <Link to="/" className="hover:text-white transition-colors">Nia</Link>. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center sm:justify-end">
              <Link to="/terms" className="text-slack-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-slack-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/cookies" className="text-slack-400 hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
