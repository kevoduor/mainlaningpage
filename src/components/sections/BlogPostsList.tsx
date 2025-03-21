
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const BLOG_POSTS = [
  {
    id: 'ai-transform-dental-practice',
    title: '5 Surprising Ways AI Can Transform Dental Practice Management',
    excerpt: 'In an industry as dynamic as dentistry, innovation has always been a cornerstone of progress. From the adoption of digital X-rays to the use of 3D printing, technology has consistently redefined how dental practices operate.',
    author: 'Kevin Oduor',
    date: '2025-03-07',
    imageUrl: '/placeholder.svg',
    slug: 'ai-transform-dental-practice'
  },
  {
    id: 'digital-marketing-dental-clinics',
    title: 'Top 10 Digital Marketing Tips for Dental Clinic Owners',
    excerpt: 'The current dental practice market demands more than top-level medical care to succeed. A skilled marketing approach will turn an underperforming practice into a successful and stable business.',
    author: 'Kevin Oduor',
    date: '2025-03-14',
    imageUrl: '/placeholder.svg',
    slug: 'digital-marketing-dental-clinics'
  },
  {
    id: 'technology-dental-practice',
    title: 'The Role of Technology in Growing a Modern Dental Practice',
    excerpt: 'This discussion shows how modern digital technologies transform dental practices by improving patient care services and business expansion in an unstable market environment.',
    author: 'Kevin Oduor',
    date: '2025-03-21',
    imageUrl: '/placeholder.svg',
    slug: 'technology-dental-practice'
  }
];

const BlogPostsList = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="border-b border-gray-200 pb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-48 object-cover rounded-lg"
                      loading="lazy" 
                    />
                  </Link>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-muted-foreground mb-2">
                    {formatDate(new Date(post.date))} • By {post.author}
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3">
                    <Link to={`/blog/${post.slug}`} className="hover:text-nia-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-nia-600 hover:text-nia-700 font-medium">
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPostsList;
