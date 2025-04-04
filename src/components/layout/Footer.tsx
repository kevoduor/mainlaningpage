
import React from 'react';
import { Link } from 'react-router-dom';
import { useBreakpoint } from '@/hooks/use-mobile';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isMobile } = useBreakpoint();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-xl font-bold mb-4">
              <Link to="/" className="hover:text-primary transition-colors">
                <span className="text-primary">hey</span>nia.
              </Link>
            </div>
            <p className="text-slate-300 mb-4 max-w-xs">
              AI-powered dental clinic management system that helps attract more patients, reduce no-shows, and automate operations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/blog/marketing-tips-attract-patients" className="text-slate-300 hover:text-white transition-colors">Marketing Tips</Link></li>
              <li><Link to="/blog/ai-transform-dental-practice" className="text-slate-300 hover:text-white transition-colors">AI in Dentistry</Link></li>
              <li><Link to="/blog/technology-dental-practice" className="text-slate-300 hover:text-white transition-colors">Technology Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Comparisons</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">HeyNia vs Dentrix</Link></li>
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">HeyNia vs Open Dental</Link></li>
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">HeyNia vs Eaglesoft</Link></li>
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Best Dentrix Alternative</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © {currentYear} <Link to="/" className="hover:text-white transition-colors">HeyNia</Link>. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center sm:justify-end">
              <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/cookies" className="text-slate-400 hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
