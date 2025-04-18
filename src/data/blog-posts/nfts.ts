import { BlogPostData } from "@/types/blogTypes";

export const getNFTPosts = (): Record<string, BlogPostData> => ({
  "nft-market-trends": {
    title: "NFT Market Trends and Emerging Collections",
    publishDate: "April 15, 2025",
    author: "ApeArmor NFT Team",
    readTime: "4 min",
    category: "NFTs",
    imageUrl: "/lovable-uploads/facc324c-ba2c-40d7-b1a7-53578ea631c9.png",
    content: `
        <p class="mb-4">The NFT market continues to evolve rapidly, with new collections and use cases emerging regularly. Let's explore the latest trends and developments in this dynamic space.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Expanding Beyond Digital Art</h2>
        <p class="mb-4">While digital art remains a significant segment of the NFT market, we're seeing increasing adoption in other areas such as gaming, music, and virtual real estate. This diversification signals a maturing market with broader applications.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Notable Emerging Collections</h2>
        <p class="mb-4">Several new NFT collections have gained attention recently, offering unique value propositions beyond simple collectibles. These include projects focused on utility, community benefits, and real-world integrations.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">The Rise of Utility-Focused NFTs</h2>
        <p class="mb-4">More collectors are seeking NFTs that provide actual utility beyond speculative value. This includes access to exclusive communities, events, content, and services. Projects that emphasize utility tend to maintain value better during market downturns.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Market Metrics</h2>
        <p class="mb-4">Trading volumes have stabilized after the initial NFT boom, with more emphasis on quality projects with strong fundamentals. Blue-chip collections continue to maintain value, while many speculative projects have seen significant corrections.</p>
        
        <p class="mb-4">As the NFT space continues to evolve, staying informed about these trends can help collectors make better investment decisions and navigate this exciting but volatile market.</p>
      `,
    relatedPosts: [
      {
        id: "7",
        title: "Top Crypto News of the Week",
        slug: "crypto-news-weekly"
      }
    ]
  }
});
