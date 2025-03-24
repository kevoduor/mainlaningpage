export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  fallbackImageUrl: string;
  slug: string;
  readTime: string;
};

export type BlogPostContent = {
  title: string;
  author: string;
  date: string;
  heroImage: string;
  content: string;
};

export const BLOG_POSTS_LIST: BlogPost[] = [
  {
    id: 'level-up-dental-marketing',
    title: 'Level Up Your Dental Marketing – Win More Patients',
    excerpt: "Just like in a game, growing your dental practice means using the right strategies to step up. Here's how to boost your marketing, attract more patients, and keep your appointment schedule full.",
    author: 'Kevin Oduor',
    date: '2025-03-23',
    imageUrl: '/blog-post-6.webp',
    fallbackImageUrl: '/lovable-uploads/1143940d-5191-49f3-851b-44b67257b857.png',
    slug: 'level-up-dental-marketing',
    readTime: '3 min read'
  },
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

export const BLOG_POSTS_CONTENT: Record<string, {
  id: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  heroImage: string;
  content: string;
}> = {
  "tips-for-dental-practice-growth": {
    id: "1",
    title: "10 Proven Tips for Dental Practice Growth in 2023",
    date: "2023-09-15",
    author: "Dr. Emily Chen",
    readTime: "5 min read",
    heroImage: "/lovable-uploads/2092ea49-25fc-463b-a435-69f201c7363b.png",
    content: `
      <h2>Strategies for Growing Your Dental Practice</h2>
      <p>Growing a dental practice in today's competitive market requires a strategic approach. Here are our top 10 proven strategies to attract new patients and retain existing ones.</p>
      
      <h3>1. Enhance Your Online Presence</h3>
      <p>In today's digital age, having a strong online presence is essential. Make sure your website is mobile-friendly, contains relevant information about your services, and includes patient testimonials.</p>
      
      <h3>2. Implement a Digital Marketing Strategy</h3>
      <p>Digital marketing can include search engine optimization (SEO), pay-per-click advertising, and social media campaigns. These tools can significantly increase your visibility to potential patients.</p>
      
      <h3>3. Focus on Patient Experience</h3>
      <p>Providing an exceptional patient experience from the first phone call to post-treatment follow-up can lead to higher patient satisfaction and more referrals.</p>
      
      <h3>4. Offer Flexible Scheduling</h3>
      <p>Accommodating patients' busy schedules by offering early morning, evening, or weekend appointments can give you a competitive edge.</p>
      
      <h3>5. Utilize Patient Referral Programs</h3>
      <p>Encourage your existing patients to refer friends and family by offering incentives such as discounts on future services or free dental products.</p>
      
      <h3>6. Expand Your Services</h3>
      <p>Consider adding new services such as cosmetic dentistry, sleep apnea treatments, or orthodontics to attract a wider range of patients.</p>
      
      <h3>7. Engage with Your Community</h3>
      <p>Participating in community events, sponsoring local sports teams, or offering free dental education at schools can increase your visibility and establish goodwill.</p>
      
      <h3>8. Optimize Your Treatment Coordination</h3>
      <p>Effective treatment coordination ensures that patients understand their treatment plans, costs, and financing options, leading to higher case acceptance rates.</p>
      
      <h3>9. Leverage Technology</h3>
      <p>Investing in the latest dental technology can improve patient care, increase efficiency, and differentiate your practice from competitors.</p>
      
      <h3>10. Automate Patient Communications</h3>
      <p>Automated appointment reminders, recall notifications, and follow-up messages can reduce no-shows and keep your schedule full.</p>
      
      <p>Implementing these strategies consistently can lead to sustainable growth for your dental practice. Remember, the key is to provide exceptional care while effectively communicating your value to current and potential patients.</p>
    `
  },
  "importance-of-regular-dental-checkups": {
    id: "2",
    title: "Why Regular Dental Checkups Are Crucial for Overall Health",
    date: "2023-08-22",
    author: "Dr. Michael Rodriguez",
    readTime: "4 min read",
    heroImage: "/lovable-uploads/0725958f-48c8-44c1-b455-27688e67d7f4.png",
    content: `
      <h2>The Connection Between Oral Health and Overall Wellbeing</h2>
      <p>Regular dental checkups are not just about maintaining a bright smile; they are essential for your overall health. Your oral health can offer clues about your general health, and problems in your mouth can affect the rest of your body.</p>
      
      <h3>Early Detection of Dental Problems</h3>
      <p>Regular dental visits allow for the early detection of issues such as tooth decay, gum disease, and even oral cancer. Catching these problems early makes them easier and less expensive to treat.</p>
      
      <p>Our skilled dental professionals are trained to identify these issues during routine examinations. Using advanced imaging technology, we can see problems that aren't visible to the naked eye.</p>
      
      <img src="/lovable-uploads/0725958f-48c8-44c1-b455-27688e67d7f4.png" alt="Dental professional in clinical setting" class="w-full rounded-lg my-6" />
      
      <h3>Connection to Systemic Health</h3>
      <p>Research has increasingly shown links between poor oral health and various systemic conditions, including:</p>
      <ul>
        <li>Heart disease</li>
        <li>Diabetes</li>
        <li>Respiratory infections</li>
        <li>Pregnancy complications</li>
        <li>Dementia</li>
      </ul>
      
      <p>For example, the bacteria that cause gum inflammation and disease can enter your bloodstream, potentially affecting your heart, lungs, and other parts of your body.</p>
      
      <h3>Professional Cleaning</h3>
      <p>Even with diligent brushing and flossing at home, professional cleaning is necessary to remove tartar buildup and reach areas that are difficult to clean yourself. This helps prevent gum disease and tooth decay.</p>
      
      <h3>Education and Prevention</h3>
      <p>During your dental visits, you'll receive personalized advice on improving your oral hygiene routine, nutritional counseling, and information about the latest dental care products that might benefit you.</p>
      
      <h3>Peace of Mind</h3>
      <p>Regular checkups provide peace of mind, knowing that your oral health is in good condition. This can reduce anxiety about potential dental problems and contribute to your overall well-being.</p>
      
      <h3>How Often Should You Visit?</h3>
      <p>For most people, dental visits every six months are recommended. However, depending on your specific oral health needs, your dentist might suggest more frequent visits.</p>
      
      <p>Don't wait until you're in pain to visit the dentist. Preventive care through regular checkups is the key to maintaining not just your oral health, but your overall health as well.</p>
      
      <p>Schedule your next dental checkup today and take a proactive step towards better health!</p>
    `
  }
};
