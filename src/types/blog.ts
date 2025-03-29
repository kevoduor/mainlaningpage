
export interface BlogPost {
  id: string;
  slug?: string; // Made optional to match existing data
  title: string;
  author: string;
  date: string;
  heroImage: string;
  readTime: string;
  category?: string; // Made optional to match existing data
  content: string;
}

export interface BlogPostSummary {
  id: string;
  slug?: string; // Made optional to match existing data
  title: string;
  author: string;
  date: string;
  excerpt: string;
  fallbackImageUrl: string;
  readTime: string;
  category?: string; // Made optional to match existing data
}
