
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
            console.log(`Fetching real-time news data for post: ${post.title}`);
            newsData = await fetchTopCryptoNews(3);
            setNewsItems(newsData);
            
            // Update the post with real-time content
            if (newsData.length > 0) {
              console.log(`Successfully fetched ${newsData.length} news items`);
              setContent(newsItemsToContent(newsData));
            } else {
              console.log("No news items returned from API");
            }
          } else if (post.useNFTData) {
            console.log(`Fetching NFT news data for post: ${post.title}`);
            newsData = await fetchNFTNews(3);
            setNewsItems(newsData);
            
            // Update the post with NFT-specific content
            if (newsData.length > 0) {
              console.log(`Successfully fetched ${newsData.length} NFT news items`);
              setContent(nftNewsItemsToContent(newsData));
            } else {
              console.log("No NFT news items returned from API");
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
  }, [post.useRealTimeData, post.useNFTData, post.title]);

  return { content, isLoading, newsItems };
};

