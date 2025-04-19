
import { BlogPostData } from "@/types/blogTypes";

export const getCryptoNewsPosts = (): Record<string, BlogPostData> => ({
  "crypto-news-today-april-2025": {
    title: "Crypto Coin News Today: Market Shifts and Regulatory Updates",
    publishDate: "April 17, 2025",
    author: "ApeArmor Research Team",
    readTime: "3 min",
    category: "Crypto News",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2232&auto=format&fit=crop",
    content: `<p class="mb-4">Loading the latest cryptocurrency news...</p>`,
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
  }
});
