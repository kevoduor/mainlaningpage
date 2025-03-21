
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogPostsList from '@/components/sections/BlogPostsList';
import { Helmet } from 'react-helmet';
import { useBreakpoint } from '@/hooks/use-mobile';

const Blog = () => {
  const { isMobile } = useBreakpoint();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dental Practice Marketing Blog | Nia</title>
        <meta name="description" content="Expert insights on dental practice management, technology implementation, and marketing strategies to grow your dental clinic." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-16 md:pt-20">
        {/* Blog Hero */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-nia-50 to-nia-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nia-800 mb-3 md:mb-4">
              Dental Marketing Insights
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert strategies and tips to help your dental practice thrive in the digital age
            </p>
            <div className="mt-6">
              <Link to="/" className="inline-flex items-center text-nia-600 hover:text-nia-700 font-medium text-sm">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to home
              </Link>
            </div>
          </div>
        </section>
        
        <BlogPostsList />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
