import { BlogPostData } from "@/types/blogTypes";

export const getCryptoNewsPosts = (): Record<string, BlogPostData> => ({
  "crypto-news-today-april-2025": {
    title: "Crypto Coin News Today: Market Shifts and Regulatory Updates",
    publishDate: "April 17, 2025",
    author: "ApeArmor Research Team",
    readTime: "3 min",
    category: "Crypto News",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2232&auto=format&fit=crop",
    content: `
        <p class="mb-4">The cryptocurrency market has experienced significant volatility in the past 24 hours, with major coins showing mixed performance. Bitcoin briefly surpassed the $75,000 mark before retracing to $72,400, while Ethereum has maintained steady growth at $4,800, approaching its all-time high.</p>
        
        <p class="mb-4">According to data from CoinMarketCap, global crypto market capitalization currently stands at $2.8 trillion, reflecting a 2.3% increase over yesterday. Trading volume has surged by 15%, indicating heightened market activity.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Regulatory Developments</h2>
        <p class="mb-4">The European Central Bank has announced plans to accelerate its digital euro project, with test implementations scheduled for Q3 2025. Meanwhile, in the United States, the SEC has approved three additional spot Ethereum ETFs, following the successful launch of Bitcoin ETFs earlier this year.</p>
        
        <p class="mb-4">As reported by Bloomberg, these regulatory developments are expected to bring more institutional capital into the cryptocurrency ecosystem, potentially stabilizing prices and reducing volatility over time.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Notable Project Updates</h2>
        <p class="mb-4">Layer-2 scaling solutions continue to gain traction, with Polygon announcing a major upgrade to its zkEVM technology. The update promises to reduce transaction costs by up to 40% while maintaining Ethereum-equivalent security guarantees.</p>
        
        <p class="mb-4">In DeFi news, decentralized exchange volumes have reached new highs, with Uniswap reporting over $15 billion in weekly trading volume. This surge coincides with the launch of several innovative financial products catering to institutional investors entering the space.</p>
        
        <p class="mb-4">The ApeArmor team continues to monitor these developments closely, providing our users with the security tools and insights needed to navigate the ever-evolving cryptocurrency landscape safely.</p>
      `,
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
