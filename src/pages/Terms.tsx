
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service | Nia</title>
        <meta name="description" content="Terms of service for using Nia dental practice management software" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p>Last updated: September 16, 2024</p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to Nia ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, products, and services (collectively, the "Services").
            </p>
            
            <h2>2. Acceptance of Terms</h2>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
            </p>
            
            <h2>3. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website or through other communications.
            </p>
            
            <h2>4. Privacy Policy</h2>
            <p>
              Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Services, you agree to our Privacy Policy.
            </p>
            
            <h2>5. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
            </p>
            
            <h2>6. Prohibited Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Use our Services for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt our Services</li>
              <li>Attempt to gain unauthorized access to our Services</li>
            </ul>
            
            <h2>7. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our Services are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            
            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including breach of these Terms.
            </p>
            
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              Our Services are provided "as is" and "as available" without any warranties of any kind, either express or implied.
            </p>
            
            <h2>10. Limitation of Liability</h2>
            <p>
              In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with these Terms or the use or inability to use our Services.
            </p>
            
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@heynia.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
