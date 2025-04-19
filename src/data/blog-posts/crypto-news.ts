
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
    useRealTimeData: true,
    relatedPosts: [
      {
        id: "using-block-explorers",
        title: "How to Use Block Explorers: Your Window into the Blockchain",
        slug: "using-block-explorers"
      },
      {
        id: "hot-vs-cold-wallets",
        title: "Hot vs. Cold Wallets: What's the Difference and Why It Matters",
        slug: "hot-vs-cold-wallets"
      },
      {
        id: "smart-contracts-basics",
        title: "Smart Contracts: The Building Blocks of Web3",
        slug: "smart-contracts-basics"
      }
    ]
  }
});
