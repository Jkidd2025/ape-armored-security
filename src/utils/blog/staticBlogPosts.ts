
import { BlogPostData } from "@/types/blogTypes";
import { getEducationPosts } from "@/data/blog-posts/education";
import { getMarketsPosts } from "@/data/blog-posts/markets";
import { getCryptoNewsPosts } from "@/data/blog-posts/crypto-news";
import { getNFTPosts } from "@/data/blog-posts/nfts";

export const getStaticBlogPost = (slug: string): BlogPostData => {
  // Get all post collections
  const educationPosts = getEducationPosts();
  const marketsPosts = getMarketsPosts();
  const cryptoNewsPosts = getCryptoNewsPosts();
  const nftPosts = getNFTPosts();
  
  // Try to find the post in each collection
  const post = educationPosts[slug] || marketsPosts[slug] || cryptoNewsPosts[slug] || nftPosts[slug];
  
  if (!post) {
    // Return default post data if not found
    return {
      title: "Blog Post",
      publishDate: "April 2025",
      author: "ApeArmor Team",
      readTime: "5 min",
      category: "Crypto News",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop",
      content: `<p class="mb-4">This is a placeholder for blog content. In a production environment, this would be fetched from a CMS or database.</p>`,
      relatedPosts: [
        {
          id: "1",
          title: "Understanding Rug Pulls: How to Identify and Avoid Them",
          slug: "understanding-rug-pulls"
        },
        {
          id: "7",
          title: "Top Crypto News of the Week",
          slug: "crypto-news-weekly"
        }
      ]
    };
  }
  
  return post;
};
