
/**
 * Utility functions for fetching crypto news from Cryptonews API
 */

const API_TOKEN = "vrwreq6s0duswvyvfnpv4ajsge8eypzxgx0z6dyj";
const API_BASE_URL = "https://cryptonews-api.com/api/v1";

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
    const response = await fetch(
      `${API_BASE_URL}/category?section=alltickers&items=${count}&page=1&token=${API_TOKEN}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: CryptoNewsResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    return [];
  }
};

/**
 * Convert API news items to HTML content string
 */
export const newsItemsToContent = (items: CryptoNewsItem[]): string => {
  if (!items || items.length === 0) {
    return "<p class='mb-4'>Unable to fetch the latest crypto news at this time. Please check back later.</p>";
  }
  
  let content = `
    <h2 class="text-2xl font-bold mt-8 mb-4">Latest Cryptocurrency Updates</h2>
    <p class="mb-6">Here's a roundup of the most significant cryptocurrency news and events from this week:</p>
  `;
  
  items.forEach((item, index) => {
    const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    content += `
      <div class="mb-6 pb-6 ${index < items.length - 1 ? "border-b border-gray-700" : ""}">
        <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
        <div class="flex items-center text-sm text-muted-foreground mb-3">
          <span>Source: ${item.source_name}</span>
          <span class="mx-2">•</span>
          <span>${formattedDate}</span>
        </div>
        <p class="mb-4">${item.text}</p>
        ${item.image_url ? `<img src="${item.image_url}" alt="${item.title}" class="rounded-md mb-4 max-w-full h-auto">` : ''}
        ${item.tickers && item.tickers.length > 0 ? `
          <div class="flex flex-wrap gap-2 mt-2">
            ${item.tickers.map(ticker => `<span class="bg-apearmor-teal/10 text-apearmor-teal text-xs px-2 py-1 rounded">${ticker}</span>`).join('')}
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
