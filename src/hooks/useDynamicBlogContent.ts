
import { useState, useEffect } from "react";
import { 
  fetchTopCryptoNews, 
  fetchNFTNews, 
  newsItemsToContent, 
  nftNewsItemsToContent, 
  CryptoNewsItem 
} from "@/utils/cryptoNewsApi";
import { BlogPostData } from "@/types/blogTypes";

/**
 * Hook for fetching and formatting dynamic content for blog posts
 */
export const useDynamicBlogContent = (post: BlogPostData) => {
  const [content, setContent] = useState<string>(post.content);
  const [isLoading, setIsLoading] = useState(false);
  const [newsItems, setNewsItems] = useState<CryptoNewsItem[]>([]);

  // Fetch real-time data for posts that need it
  useEffect(() => {
    const loadRealTimeData = async () => {
      if (post.useRealTimeData || post.useNFTData) {
        setIsLoading(true);
        try {
          let newsData: CryptoNewsItem[] = [];
          
          if (post.useRealTimeData) {
            newsData = await fetchTopCryptoNews(3);
            setNewsItems(newsData);
            
            // Update the post with real-time content
            if (newsData.length > 0) {
              setContent(newsItemsToContent(newsData));
            }
          } else if (post.useNFTData) {
            newsData = await fetchNFTNews(3);
            setNewsItems(newsData);
            
            // Update the post with NFT-specific content
            if (newsData.length > 0) {
              setContent(nftNewsItemsToContent(newsData));
            }
          }
        } catch (error) {
          console.error("Failed to load real-time news data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadRealTimeData();
  }, [post.useRealTimeData, post.useNFTData]);

  return { content, isLoading, newsItems };
};
