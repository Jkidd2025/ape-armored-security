
/**
 * Get the specific blog post configuration for dynamic content posts
 */
export const getDynamicBlogPostConfig = (slug: string): { useRealTimeData?: boolean; useNFTData?: boolean } => {
  if (slug === "crypto-news-weekly") {
    return { useRealTimeData: true };
  }
  
  if (slug === "nft-market-trends") {
    return { useNFTData: true };
  }
  
  if (slug === "crypto-news-today-april-2025") {
    return { useRealTimeData: true };
  }
  
  return {};
};

