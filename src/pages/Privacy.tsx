
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | Nia</title>
        <meta name="description" content="Privacy policy for Nia dental practice management software" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p>Last updated: September 16, 2024</p>
            
            <h2>1. Introduction</h2>
            <p>
              At Nia, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul>
              <li>Personal Information: Name, email address, phone number, and business information</li>
              <li>Usage Data: Information about how you use our website and services</li>
              <li>Device Information: IP address, browser type, operating system, and other technology on the devices you use</li>
              <li>Cookies and Tracking Technologies: Information collected through cookies and similar technologies</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use your information for the following purposes:
            </p>
            <ul>
              <li>To provide and improve our services</li>
              <li>To communicate with you</li>
              <li>To personalize your experience</li>
              <li>To analyze usage patterns and improve our website</li>
              <li>To protect our services and users</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>4. Sharing Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with your consent</li>
              <li>Legal authorities when required by law</li>
              <li>In connection with a business transaction such as a merger or acquisition</li>
            </ul>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal data</li>
              <li>Correction of inaccurate or incomplete data</li>
              <li>Deletion of your personal data</li>
              <li>Objection to processing of your data</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
            
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children.
            </p>
            
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@heynia.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
