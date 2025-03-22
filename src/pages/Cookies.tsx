
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Cookie Policy | Nia</title>
        <meta name="description" content="Cookie policy for Nia dental practice management software" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
          
          <div className="prose max-w-none">
            <p>Last updated: September 16, 2024</p>
            
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            
            <h2>2. How We Use Cookies</h2>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul>
              <li>Essential cookies: These are necessary for the website to function properly</li>
              <li>Analytical/performance cookies: These help us understand how visitors interact with our website</li>
              <li>Functionality cookies: These enable enhanced functionality and personalization</li>
              <li>Targeting cookies: These record your visits to our website, the pages you visit, and the links you follow</li>
            </ul>
            
            <h2>3. Types of Cookies We Use</h2>
            <p>
              We use the following types of cookies:
            </p>
            <ul>
              <li>Session cookies: These are temporary and expire when you close your browser</li>
              <li>Persistent cookies: These remain on your device for a specified period</li>
              <li>First-party cookies: These are set by the website you are visiting</li>
              <li>Third-party cookies: These are set by a domain other than the one you are visiting</li>
            </ul>
            
            <h2>4. Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul>
              <li>Delete cookies from your browser</li>
              <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
              <li>Allow cookies from specific websites</li>
            </ul>
            <p>
              Please note that if you choose to block all cookies, you may not be able to access all or parts of our website.
            </p>
            
            <h2>5. Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
            
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy, please contact us at cookies@heynia.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
