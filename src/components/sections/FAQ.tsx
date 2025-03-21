
import React, { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import CTAButton from '../ui/CTAButton';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const faqCategories = [
    { id: "all", name: "All Questions" },
    { id: "core", name: "Core Features" },
    { id: "automation", name: "Automation & AI" },
    { id: "financial", name: "Financial & Billing" },
    { id: "patient", name: "Patient Engagement" },
    { id: "integration", name: "Integration" },
    { id: "marketing", name: "Marketing & SEO" },
  ];

  const faqItems = [
    // Core Software Features
    {
      category: "core",
      question: "What is a dental clinic management system, and how does it help my practice?",
      answer: "A dental clinic management system is a software solution designed to help dental practices streamline daily operations. It includes features like appointment scheduling, patient records management, billing, treatment planning, and reporting, all in one platform."
    },
    {
      category: "core",
      question: "How does Nia's appointment scheduling software improve efficiency?",
      answer: "Nia's appointment scheduling software automates patient bookings, minimizes scheduling conflicts, and sends reminders to reduce no-shows. It also offers smart scheduling features that optimize your daily workflow."
    },
    {
      category: "core",
      question: "What are electronic health records (EHR) for dentists, and why are they important?",
      answer: "EHR for dentists stores patient health information digitally, including medical history, treatment plans, prescriptions, and X-rays. This ensures better accuracy, faster access to records, and improved patient care."
    },
    {
      category: "core",
      question: "How does Nia's dental billing software simplify payment processing?",
      answer: "Nia's dental billing software automates invoicing, tracks patient payments, manages insurance claims, and integrates with online payment processing to improve cash flow."
    },
    {
      category: "core",
      question: "What are the benefits of using a patient management system?",
      answer: "A patient management system centralizes all patient-related information, including contact details, appointment history, treatment plans, and billing records, making it easier for dentists to deliver personalized care."
    },
    {
      category: "core",
      question: "How does dental charting software enhance treatment planning?",
      answer: "Dental charting software provides a visual representation of a patient's oral health, allowing dentists to document conditions, track progress, and communicate treatment plans effectively."
    },
    {
      category: "core",
      question: "Is Nia a cloud-based dental software?",
      answer: "Yes, Nia is cloud-based, meaning you can securely access your clinic's data anytime, anywhere, without the need for on-site servers."
    },
    
    // Automation & AI
    {
      category: "automation",
      question: "What is AI-powered dental software, and how does it benefit dentists?",
      answer: "AI-powered dental software automates tasks like appointment scheduling, diagnosis assistance, and patient follow-ups, reducing administrative workload and enhancing accuracy."
    },
    {
      category: "automation",
      question: "How do automated appointment reminders help reduce no-shows?",
      answer: "Nia sends automated SMS, email, and WhatsApp reminders to patients before their appointments, significantly reducing missed visits."
    },
    {
      category: "automation",
      question: "Can I use voice search for dental records with Nia?",
      answer: "Yes, Nia supports voice search, allowing dentists to retrieve patient records hands-free, improving efficiency during consultations."
    },
    {
      category: "automation",
      question: "How do AI dental diagnosis tools improve accuracy?",
      answer: "AI dental diagnosis tools analyze images, X-rays, and patient data to assist dentists in detecting potential oral health issues early, improving treatment outcomes."
    },
    {
      category: "automation",
      question: "What is smart scheduling for dentists?",
      answer: "Smart scheduling optimizes appointment slots based on patient preferences, availability, and clinic workload, ensuring maximum efficiency and minimal downtime."
    },
    
    // Financial & Billing
    {
      category: "financial",
      question: "What is dental insurance billing software, and how does it work?",
      answer: "Dental insurance billing software automates the process of submitting and tracking insurance claims, reducing errors and ensuring faster reimbursements."
    },
    {
      category: "financial",
      question: "How does revenue cycle management help dental clinics?",
      answer: "Revenue cycle management (RCM) ensures timely patient payments, tracks outstanding balances, and streamlines the entire billing and collection process."
    },
    {
      category: "financial",
      question: "Does Nia support online payment processing for dental clinics?",
      answer: "Yes, Nia integrates with multiple payment gateways, allowing patients to pay securely online using credit/debit cards and digital wallets."
    },
    {
      category: "financial",
      question: "How does automated invoicing benefit dental offices?",
      answer: "Automated invoicing generates and sends invoices to patients and insurance providers, reducing manual effort and improving billing accuracy."
    },
    {
      category: "financial",
      question: "What is a claims management system for dentists?",
      answer: "A claims management system helps clinics track, process, and follow up on insurance claims to ensure faster approval and minimal denials."
    },
    
    // Patient Engagement & Communication
    {
      category: "patient",
      question: "What is a patient portal for dentists?",
      answer: "A patient portal allows patients to view their records, book appointments, make payments, and communicate with their dentist online."
    },
    {
      category: "patient",
      question: "How do SMS reminders for dental appointments work?",
      answer: "Nia automatically sends SMS reminders to patients before their scheduled visits to reduce no-shows and late cancellations."
    },
    {
      category: "patient",
      question: "Does Nia support online booking for dental clinics?",
      answer: "Yes, Nia includes an online booking system that allows patients to schedule their appointments 24/7, improving accessibility and patient satisfaction."
    },
    {
      category: "patient",
      question: "How can email marketing benefit dentists?",
      answer: "Email marketing helps clinics send appointment reminders, newsletters, promotions, and oral health tips to keep patients engaged and encourage repeat visits."
    },
    {
      category: "patient",
      question: "What telehealth solutions does Nia offer for dental practices?",
      answer: "Nia supports video consultations, secure messaging, and virtual follow-ups, making it easy for dentists to provide remote care when needed."
    },
    
    // Integration & Compatibility
    {
      category: "integration",
      question: "Is Nia a cloud-based dental practice software?",
      answer: "Yes, Nia is fully cloud-based, ensuring secure and remote access from any device."
    },
    {
      category: "integration",
      question: "Does Nia integrate with dental X-ray machines?",
      answer: "Yes, Nia supports X-ray integration, allowing dentists to upload, store, and view images directly within the software."
    },
    {
      category: "integration",
      question: "Can Nia integrate with EHR and PMS systems for dental clinics?",
      answer: "Yes, Nia offers seamless integration with existing electronic health records (EHR) and practice management systems (PMS) for smooth data transfer."
    },
    {
      category: "integration",
      question: "Is Nia mobile-friendly?",
      answer: "Yes, Nia is designed to work on desktops, tablets, and smartphones, so dentists can manage their clinics on the go."
    },
    {
      category: "integration",
      question: "Is Nia HIPAA-compliant?",
      answer: "Yes, Nia follows strict HIPAA regulations to ensure patient data security and privacy."
    },
    
    // Marketing & SEO for Dental Clinics
    {
      category: "marketing",
      question: "How can I attract more patients to my dental clinic?",
      answer: "To attract more patients, focus on digital marketing strategies like local SEO, social media engagement, online reviews, and paid advertising."
    },
    {
      category: "marketing",
      question: "What are the best digital marketing strategies for dentists?",
      answer: "The most effective digital marketing strategies for dental clinics include: Local SEO to rank higher in searches, Google Ads & Facebook Ads to target new patients, Social Media Marketing to engage with potential patients, Email Marketing to retain existing patients, and Online Reviews to build trust and credibility."
    },
    {
      category: "marketing",
      question: "How can I improve my dental clinic's SEO?",
      answer: "Optimize your Google My Business profile, use location-based keywords in your website content, ensure your website loads fast and is mobile-friendly, encourage patient reviews on Google, and publish blog content regularly on dental health topics."
    },
    {
      category: "marketing",
      question: "How do paid ads help dentists attract new patients?",
      answer: "Google Ads and Facebook Ads help target potential patients actively searching for dental services, increasing clinic appointments."
    },
    {
      category: "marketing",
      question: "What is local SEO, and why is it important for dentists?",
      answer: "Local SEO helps your clinic appear in searches like \"dentist near me,\" increasing visibility among nearby patients."
    },
    {
      category: "marketing",
      question: "How do I optimize my Google My Business profile?",
      answer: "Complete your profile with accurate details, add high-quality photos of your clinic, respond to patient reviews, and post regular updates about your services."
    },
    {
      category: "marketing",
      question: "How do patient testimonials help in marketing?",
      answer: "Positive reviews and testimonials build trust and encourage potential patients to choose your clinic over competitors."
    },
    {
      category: "marketing",
      question: "How do referral programs work for dental clinics?",
      answer: "Offer incentives for existing patients who refer new patients, such as discounts on services or special promotions."
    },
    {
      category: "marketing",
      question: "How do I use video marketing for my dental clinic?",
      answer: "Create short videos explaining dental procedures, offering oral hygiene tips, and sharing patient success stories to build engagement."
    },
    {
      category: "marketing",
      question: "What kind of website should a dental clinic have?",
      answer: "A fast, mobile-friendly, and SEO-optimized website with: online booking, contact details & location, patient testimonials, and educational blog content."
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(faq => faq.category === activeCategory);

  return (
    <section id="faq" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about Nia and dental practice management"
          center={true}
        />
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-nia-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <CTAButton isBookDemo={true} className="w-full sm:w-auto">
            Book a Free Demo
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
