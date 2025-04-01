
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import CTAButton from '@/components/ui/CTAButton';
import { Helmet } from 'react-helmet';
import { BLOG_POSTS_CONTENT } from '@/data/blogPosts';
import { useBreakpoint } from '@/hooks/use-mobile';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug && BLOG_POSTS_CONTENT[slug];
  const { isMobile } = useBreakpoint();
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Blog Post Not Found | Nia</title>
        </Helmet>
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-6">Sorry, the blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button variant="default">Return to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Extract a short excerpt for the meta description
  const stripTags = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");
  const contentText = stripTags(post.content);
  const metaDescription = contentText.substring(0, 160) + "...";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{post.title} | Nia Blog</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
          </div>
          
          {/* Article header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-muted-foreground mb-6">
              <div className="flex items-center mr-4">
                <User className="mr-1 h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{formatDate(new Date(post.date))}</span>
              </div>
            </div>
            
            {/* Animated header visual instead of image */}
            <div className="w-full h-[250px] md:h-[400px] rounded-lg mb-8 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-tr from-nia-700 to-nia-400 wave-bg-animation flex items-center justify-center">
                <div className="text-white text-center px-6">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 opacity-90">{post.title}</h2>
                  <div className="max-w-md mx-auto">
                    <div className="h-2 bg-white/20 rounded-full mb-2 w-3/4 mx-auto animate-pulse"></div>
                    <div className="h-2 bg-white/20 rounded-full mb-2 w-1/2 mx-auto animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 bg-white/20 rounded-full w-2/3 mx-auto animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          {/* Article content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <Separator className="my-12" />
          
          {/* Call to action */}
          <div className="bg-muted p-8 rounded-lg text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Ready to improve your dental practice?</h3>
            <p className="text-muted-foreground mb-6">
              Let Nia's practice management software help you implement these strategies with ease.
            </p>
            <CTAButton />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
