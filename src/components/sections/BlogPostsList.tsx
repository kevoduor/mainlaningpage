
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/use-mobile';
import { AspectRatio } from '../ui/aspect-ratio';
import { BLOG_POSTS_LIST } from '@/data/blogPosts';
import OptimizedImage from '../ui/OptimizedImage';

const BlogPostsList = () => {
  const { isMobile, isTablet } = useBreakpoint();
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {BLOG_POSTS_LIST.map((post) => (
            <article key={post.id} className="group border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="md:col-span-1 overflow-hidden">
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <AspectRatio ratio={4/3} className="h-48 md:h-full w-full">
                      <OptimizedImage 
                        src={post.fallbackImageUrl} 
                        alt={post.title} 
                        width={600}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </AspectRatio>
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
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
