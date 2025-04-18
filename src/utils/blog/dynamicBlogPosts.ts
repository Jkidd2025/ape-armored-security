
import { BlogPostData } from "@/types/blogTypes";
import { getDynamicBlogPostConfig } from "./dynamicBlogConfig";

/**
 * Get dynamic blog post data for special cases like real-time news
 */
export const getDynamicBlogPost = (slug: string): Partial<BlogPostData> => {
  const dynamicConfig = getDynamicBlogPostConfig(slug);
  
  if (slug === "crypto-news-weekly") {
    return {
      title: "Top Crypto News of the Week",
      publishDate: "April 7, 2025",
      author: "ApeArmor News Team",
      readTime: "4 min",
      category: "Crypto News",
      imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2232&auto=format&fit=crop",
      content: `<p class="mb-4">Loading the latest cryptocurrency news...</p>`,
      ...dynamicConfig,
      relatedPosts: [
        {
          id: "9",
          title: "Crypto Coin News Today: Market Shifts and Regulatory Updates",
          slug: "crypto-news-today-april-2025"
        },
        {
          id: "5",
          title: "Latest Market Trends in Cryptocurrency",
          slug: "market-trends-crypto"
        }
      ]
    };
  }

  if (slug === "nft-market-trends") {
    return {
      title: "NFT Market Trends and Emerging Collections",
      publishDate: "April 15, 2025",
      author: "ApeArmor NFT Team",
      readTime: "4 min",
      category: "NFT",
      imageUrl: "",
      content: `<p class="mb-4">Loading the latest NFT market news...</p>`,
      ...dynamicConfig,
      relatedPosts: [
        {
          id: "4",
          title: "NFT Security: Protecting Your Digital Assets",
          slug: "nft-security"
        },
        {
          id: "7",
          title: "Top Crypto News of the Week",
          slug: "crypto-news-weekly"
        }
      ]
    };
  }
  
  return dynamicConfig;
};

