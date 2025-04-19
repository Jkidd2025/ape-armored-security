
import { supabase } from "@/integrations/supabase/client";
import { CryptoNewsItem } from "./types";

/**
 * Fetch top crypto news articles
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
 * Fetch historical crypto news articles from a specific date range
 */
export const fetchHistoricalNews = async (startDate: string, endDate: string): Promise<CryptoNewsItem[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("crypto-news", {
      body: {
        endpoint: "category",
        params: {
          section: "alltickers",
          items: 3,
          page: 1,
          date: `${startDate}-${endDate}`
        }
      }
    });
    
    if (error) {
      throw new Error(`Edge function error: ${error.message}`);
    }
    
    console.log("Fetched historical crypto news data:", data.data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching historical crypto news:", error);
    return [];
  }
};
