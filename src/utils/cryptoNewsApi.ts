/**
 * Utility functions for fetching crypto news from our Supabase edge function
 */
import { supabase } from "@/integrations/supabase/client";

export interface CryptoNewsItem {
  news_id: string;
  title: string;
  text: string;
  date: string;
  source_name: string;
  image_url: string;
  topics: string[];
  sentiment: string;
  type: string;
  tickers?: string[];
  news_url?: string;
}

export interface CryptoNewsResponse {
  category: string;
  data: CryptoNewsItem[];
  items_count: number;
  page: number;
  status: string;
  total_pages: number;
}

/**
 * Fetch top crypto news articles
 * @param count Number of articles to fetch
 * @returns Array of news articles
 */
export const fetchTopCryptoNews = async (count: number = 3): Promise<CryptoNewsItem[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("crypto-news", {
      body: {
        endpoint: "category",
        params: {
          section: "alltickers",
          items: count,
          page: 1
        }
      }
    });
    
    if (error) {
      throw new Error(`Edge function error: ${error.message}`);
    }
    
    console.log("Fetched crypto news data:", data.data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    return [];
  }
};

/**
 * Fetch NFT-related news articles
 * @param count Number of articles to fetch
 * @returns Array of NFT news articles
 */
export const fetchNFTNews = async (count: number = 3): Promise<CryptoNewsItem[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("crypto-news", {
      body: {
        endpoint: "category",
        params: {
          section: "general",
          items: count,
          topic: "NFT",
          page: 1
        }
      }
    });
    
    if (error) {
      throw new Error(`Edge function error: ${error.message}`);
    }
    
    console.log("Fetched NFT news data:", data.data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching NFT news:", error);
    return [];
  }
};

/**
 * Checks if a URL is valid and points to an image
 */
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http') && 
    (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || 
     url.endsWith('.gif') || url.endsWith('.webp') || url.includes('.jpg?') || 
     url.includes('.png?') || url.includes('.jpeg?') || url.includes('.webp?'));
};

/**
 * Convert API news items to HTML content string
 */
export const newsItemsToContent = (items: CryptoNewsItem[], title: string = "Latest Cryptocurrency Updates", intro: string = "Here's a roundup of the most significant cryptocurrency news and events from this week:", includeImages: boolean = true): string => {
  if (!items || items.length === 0) {
    return "<p class='mb-4'>Unable to fetch the latest crypto news at this time. Please check back later.</p>";
  }
  
  let content = `
    <h2 class="text-2xl font-bold mt-8 mb-4">${title}</h2>
    <p class="mb-6">${intro}</p>
  `;
  
  // Fallback images to use if the API doesn't provide an image
  const fallbackImages = [
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2232&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?q=80&w=2232&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1639762681057-408b52a4c1e2?q=80&w=2232&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2232&auto=format&fit=crop"
  ];
  
  items.forEach((item, index) => {
    const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // More robust image URL validation and selection
    let imageUrl = fallbackImages[index % fallbackImages.length];
    
    if (isValidImageUrl(item.image_url)) {
      imageUrl = item.image_url;
      console.log(`Using API-provided image for article ${index}: ${imageUrl}`);
    } else {
      console.log(`Using fallback image for article ${index}: ${imageUrl}`);
    }
    
    content += `
      <div class="mb-6 pb-6 ${index < items.length - 1 ? "border-b border-gray-700" : ""}">
        <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
        <div class="flex items-center text-sm text-muted-foreground mb-3">
          <span>Source: ${item.source_name}</span>
          <span class="mx-2">•</span>
          <span>${formattedDate}</span>
        </div>
        <p class="mb-4">${item.text}</p>
        ${includeImages ? `
          <img src="${isValidImageUrl(item.image_url) ? item.image_url : fallbackImages[index % fallbackImages.length]}" 
               alt="${item.title}" 
               class="rounded-md mb-4 max-w-full h-auto">
        ` : ''}
        ${item.tickers && item.tickers.length > 0 ? `
          <div class="flex flex-wrap gap-2 mt-2">
            ${item.tickers.map(ticker => `<span class="bg-apearmor-teal/10 text-apearmor-teal text-xs px-2 py-1 rounded">${ticker}</span>`).join('')}
          </div>
        ` : ''}
        ${item.news_url ? `
          <div class="mt-3">
            <a href="${item.news_url}" target="_blank" rel="noopener noreferrer" class="text-apearmor-teal hover:underline">
              Read original article
            </a>
          </div>
        ` : ''}
      </div>
    `;
  });
  
  content += `
    <p class="mt-4">Stay tuned to ApeArmor's Ape Wire for more updates and expert analysis on the evolving cryptocurrency landscape.</p>
  `;
  
  return content;
};

/**
 * Convert API news items to HTML content string specifically for NFT news
 */
export const nftNewsItemsToContent = (items: CryptoNewsItem[]): string => {
  return newsItemsToContent(
    items, 
    "Latest NFT Market Updates",
    "Check out the most recent developments in the NFT space:",
    false // Don't include images for NFT content
  );
};
