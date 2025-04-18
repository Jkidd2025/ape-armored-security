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
      imageUrl: "/lovable-uploads/7187bcba-a332-404f-b5e1-f82cc4832d2e.png",
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
      imageUrl: "/lovable-uploads/facc324c-ba2c-40d7-b1a7-53578ea631c9.png",
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
  
  if (slug === "historical-crypto-news") {
    return {
      title: "Historical News: Major Milestones in Crypto History",
      publishDate: "April 16, 2025",
      author: "ApeArmor Research Team",
      readTime: "7 min",
      category: "Crypto News",
      imageUrl: "/lovable-uploads/7187bcba-a332-404f-b5e1-f82cc4832d2e.png",
      content: `<p class="mb-4">Loading historical cryptocurrency news...</p>`,
      useHistoricalNews: true,
      ...dynamicConfig,
      relatedPosts: [
        {
          id: "7",
          title: "Top Crypto News of the Week",
          slug: "crypto-news-weekly"
        },
        {
          id: "5",
          title: "Latest Market Trends in Cryptocurrency",
          slug: "market-trends-crypto"
        }
      ]
    };
  }
  
  return dynamicConfig;
};
