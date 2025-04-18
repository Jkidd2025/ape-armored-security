
import { BlogPostData } from "@/types/blogTypes";

export const getNFTPosts = (): Record<string, BlogPostData> => ({
  "nft-security": {
    title: "NFT Security: Protecting Your Digital Assets",
    publishDate: "April 14, 2025",
    author: "ApeArmor NFT Team",
    readTime: "6 min",
    category: "NFTs",
    imageUrl: "/lovable-uploads/facc324c-ba2c-40d7-b1a7-53578ea631c9.png",
    content: `
        <p class="mb-4">As NFTs continue to gain popularity, understanding how to secure your digital assets becomes increasingly important.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Key Security Risks for NFT Owners</h2>
        <p class="mb-4">NFT owners face various security risks, including phishing attacks, smart contract vulnerabilities, and marketplace exploits. Understanding these risks is the first step toward protecting your digital assets.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Best Practices for NFT Security</h2>
        <p class="mb-4">Here are some essential security practices for NFT collectors:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Use a hardware wallet for storing high-value NFTs</li>
          <li>Enable two-factor authentication on all platforms</li>
          <li>Verify smart contracts before interacting with them</li>
          <li>Be cautious of offers that seem too good to be true</li>
          <li>Research projects thoroughly before investing</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Smart Contract Risks</h2>
        <p class="mb-4">Smart contracts power NFT transactions, but they can contain vulnerabilities. Always check if a project's smart contracts have been audited by reputable security firms before investing.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Marketplace Safety</h2>
        <p class="mb-4">When buying or selling NFTs, stick to established marketplaces with good security track records. Be especially careful with new or unverified marketplaces that may lack proper security measures.</p>
        
        <p class="mb-4">By following these security practices, you can better protect your NFT investments in this rapidly evolving digital asset class.</p>
      `,
    relatedPosts: [
      {
        id: "10",
        title: "NFT Market Trends and Emerging Collections",
        slug: "nft-market-trends"
      },
      {
        id: "7",
        title: "Top Crypto News of the Week",
        slug: "crypto-news-weekly"
      }
    ]
  },
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
        id: "4",
        title: "NFT Security: Protecting Your Digital Assets",
        slug: "nft-security"
      },
      {
        id: "7",
        title: "Top Crypto News of the Week",
        slug: "crypto-news-weekly"
      }
    ],
    useNFTData: true
  }
});
