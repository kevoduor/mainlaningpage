
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  heroImage: string;
  readTime: string;
  category: string;
  content: string;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  fallbackImageUrl: string;
  readTime: string;
  category: string;
}
