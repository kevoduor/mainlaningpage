import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/use-mobile';

// Move the data outside the component to reduce re-renders
const BLOG_POSTS = [
  {
    id: 'marketing-tips-attract-patients',
    title: 'Top Marketing Tips to Attract New Patients to Your Dentist Office',
    excerpt: 'If your dentist office is looking to grow, strategic marketing is key. Here are some effective tactics to help you bring in new patients and keep your schedule full.',
    author: 'Kevin Oduor',
    date: '2025-02-20',
    imageUrl: '/blog-post-1.webp',
    fallbackImageUrl: '/lovable-uploads/94bc9c7c-11d3-4afa-b589-edf97741e042.png',
    slug: 'marketing-tips-attract-patients',
    readTime: '5 min read'
  },
  {
    id: 'creative-dental-marketing-ideas',
    title: 'Creative Dental Marketing Ideas to Grow Your Practice',
    excerpt: 'In a competitive dental market, standing out and connecting with your patients is key. Here are some innovative dental marketing ideas to help your practice grow.',
    author: 'Kevin Oduor',
    date: '2025-02-27',
    imageUrl: '/blog-post-2.webp',
    fallbackImageUrl: '/lovable-uploads/8c03c084-888c-473b-9f88-33f0a89b8930.png',
    slug: 'creative-dental-marketing-ideas',
    readTime: '4 min read'
  },
  {
    id: 'ai-transform-dental-practice',
    title: '5 Surprising Ways AI Can Transform Dental Practice Management',
    excerpt: 'In an industry as dynamic as dentistry, innovation has always been a cornerstone of progress. From the adoption of digital X-rays to the use of 3D printing, technology has consistently redefined how dental practices operate.',
    author: 'Kevin Oduor',
    date: '2025-03-07',
    imageUrl: '/blog-post-3.webp',
    fallbackImageUrl: '/lovable-uploads/611ce3aa-c93e-42c4-9b72-3b60a6292c91.png',
    slug: 'ai-transform-dental-practice',
    readTime: '6 min read'
  },
  {
    id: 'digital-marketing-dental-clinics',
    title: 'Top 10 Digital Marketing Tips for Dental Clinic Owners',
    excerpt: 'The current dental practice market demands more than top-level medical care to succeed. A skilled marketing approach will turn an underperforming practice into a successful and stable business.',
    author: 'Kevin Oduor',
    date: '2025-03-14',
    imageUrl: '/blog-post-4.webp',
    fallbackImageUrl: '/lovable-uploads/e9dbc504-705b-4d4b-b94f-4ae28467a2b1.png',
    slug: 'digital-marketing-dental-clinics',
    readTime: '7 min read'
  },
  {
    id: 'technology-dental-practice',
    title: 'The Role of Technology in Growing a Modern Dental Practice',
    excerpt: 'This discussion shows how modern digital technologies transform dental practices by improving patient care services and business expansion in an unstable market environment.',
    author: 'Kevin Oduor',
    date: '2025-03-21',
    imageUrl: '/blog-post-5.webp',
    fallbackImageUrl: '/lovable-uploads/308645d0-800f-4037-99d2-89d895e8e9a5.png',
    slug: 'technology-dental-practice',
    readTime: '5 min read'
  }
];

// Memoized BlogPost image component with WebP and proper sizing
const BlogPostImage = React.memo(({ post, index }: { post: typeof BLOG_POSTS[0], index: number }) => (
  <picture>
    <source 
      srcSet={`${post.imageUrl.replace('.webp', '-300w.webp')} 300w, ${post.imageUrl.replace('.webp', '-600w.webp')} 600w, ${post.imageUrl} 900w`}
      sizes="(max-width: 768px) 100vw, 33vw"
      type="image/webp"
    />
    <img 
      src={post.fallbackImageUrl} 
      alt={post.title} 
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      width="600"
      height="450"
      loading={index < 2 ? "eager" : "lazy"}
      fetchPriority={index === 0 ? "high" : index === 1 ? "medium" : "low"}
      decoding="async"
      style={{
        aspectRatio: '4/3',
      }}
    />
  </picture>
));

BlogPostImage.displayName = 'BlogPostImage';

const BlogPostsList = () => {
  const { isMobile, isTablet } = useBreakpoint();
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {BLOG_POSTS.map((post, index) => (
            <article key={post.id} className="group border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="md:col-span-1 overflow-hidden">
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <div className="h-48 md:h-full w-full relative overflow-hidden">
                      <BlogPostImage post={post} index={index} />
                    </div>
                  </Link>
                </div>
                <div className="md:col-span-2 p-5 md:p-6 flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                    <span className="inline-flex items-center">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      {formatDate(new Date(post.date))}
                    </span>
                    <span className="inline-flex items-center">
                      <User className="mr-1 h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="hidden sm:inline-block">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 line-clamp-2 text-balance">
                    <Link to={`/blog/${post.slug}`} className="hover:text-nia-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 flex-grow line-clamp-2 md:line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="inline-flex items-center text-nia-600 hover:text-nia-700 font-medium mt-auto"
                  >
                    Read full article 
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" style={{transform: 'translate3d(0,0,0)'}} />
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

export default React.memo(BlogPostsList);
