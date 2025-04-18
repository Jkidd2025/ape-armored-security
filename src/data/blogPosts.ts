import { BlogPost } from "@/types/blog";

export const categories = ["All", "Crypto News", "Education", "Markets", "NFTs"];

export const blogPosts: BlogPost[] = [
  {
    id: "market-data-1",
    title: "Understanding Crypto Market Data: Key Metrics for Traders",
    slug: "crypto-market-data-metrics",
    excerpt: "Learn about essential market data metrics including volume, market cap, and liquidity indicators that shape crypto trading decisions.",
    date: "April 18, 2025",
    readTime: "6 min",
    category: "Markets",
    imageUrl: "/lovable-uploads/da785f2c-2e2b-4eb1-9a0f-4257780baab6.png"
  },
  {
    id: "nft1", 
    title: "NFT Market Trends and Emerging Collections", 
    slug: "nft-market-trends",
    excerpt: "Explore the latest trends in the NFT market, from blue-chip collections to emerging artists making waves in the digital art space.", 
    date: "April 15, 2025",
    readTime: "4 min", 
    category: "NFTs",
    imageUrl: "/lovable-uploads/facc324c-ba2c-40d7-b1a7-53578ea631c9.png"
  },
  {
    id: "smart-contracts-1",
    title: "Smart Contracts: The Building Blocks of Web3",
    slug: "smart-contracts-basics",
    excerpt: "Discover how smart contracts are revolutionizing digital agreements and powering decentralized applications in the blockchain ecosystem.",
    date: "April 16, 2025",
    readTime: "7 min",
    category: "Education",
    imageUrl: "/lovable-uploads/f15cea00-0f09-4da3-ab78-f1ad7717ac39.png"
  },
  {
    id: "1",
    title: "Understanding Rug Pulls: How to Identify and Avoid Them",
    excerpt: "Learn the warning signs of potential rug pulls and how ApeArmor's protection services can keep your investments safe.",
    date: "April 10, 2025",
    category: "Education",
    imageUrl: "/lovable-uploads/50c3c6ba-b7be-4937-8f4c-f75237cb7c15.png",
    readTime: "5 min",
    slug: "understanding-rug-pulls"
  },
  {
    id: "5",
    title: "Latest Market Trends in Cryptocurrency",
    excerpt: "Analysis of the latest market trends and what they mean for your investment strategy.",
    date: "April 12, 2025",
    category: "Markets",
    imageUrl: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2232&auto=format&fit=crop",
    readTime: "5 min",
    slug: "market-trends-crypto"
  },
  {
    id: "6",
    title: "Blockchain Basics: Understanding the Technology",
    excerpt: "A beginner's guide to understanding blockchain technology and its applications.",
    date: "April 8, 2025",
    category: "Education",
    imageUrl: "/lovable-uploads/c129d5f2-d603-4e13-9ffe-3971adc1dedd.png",
    readTime: "10 min",
    slug: "blockchain-basics"
  },
  {
    id: "7",
    title: "Top Crypto News of the Week",
    excerpt: "Roundup of the most important cryptocurrency news and events from the past week.",
    date: "April 7, 2025",
    category: "Crypto News",
    imageUrl: "/lovable-uploads/7187bcba-a332-404f-b5e1-f82cc4832d2e.png",
    readTime: "4 min",
    slug: "crypto-news-weekly"
  },
  {
    id: "8",
    title: "Future of Finance: DeFi and Traditional Banking",
    excerpt: "Exploring how decentralized finance is disrupting traditional banking systems.",
    date: "March 30, 2025",
    category: "Markets",
    imageUrl: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2232&auto=format&fit=crop",
    readTime: "9 min",
    slug: "defi-vs-banking"
  }
];
