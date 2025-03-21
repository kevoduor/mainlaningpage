
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogPostsList from '@/components/sections/BlogPostsList';
import { Helmet } from 'react-helmet';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dental Practice Marketing Blog | Nia</title>
        <meta name="description" content="Expert insights on dental practice management, technology implementation, and marketing strategies to grow your dental clinic." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Blog Hero */}
        <section className="py-12 md:py-16 bg-nia-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nia-800 mb-4">Nia Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, trends, and strategies to help dental practices thrive in the digital age.
            </p>
          </div>
        </section>
        
        <BlogPostsList />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
