
import { CryptoNewsItem } from "./types";
import { isValidImageUrl, FALLBACK_IMAGES } from "./utils";

/**
 * Convert API news items to HTML content string
 */
export const newsItemsToContent = (
  items: CryptoNewsItem[], 
  title: string = "Latest Cryptocurrency Updates", 
  intro: string = "Here's a roundup of the most significant cryptocurrency news and events from this week:", 
  includeImages: boolean = true
): string => {
  if (!items || items.length === 0) {
    return "<p class='mb-4'>Unable to fetch the latest crypto news at this time. Please check back later.</p>";
  }
  
  let content = `
    <h2 class="text-2xl font-bold mt-8 mb-4">${title}</h2>
    <p class="mb-6">${intro}</p>
  `;
  
  items.forEach((item, index) => {
    const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    let imageUrl = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
    
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
          <img src="${isValidImageUrl(item.image_url) ? item.image_url : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}" 
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
    true
  );
};

/**
 * Convert API news items to HTML content string specifically for historical news
 */
export const historicalNewsToContent = (items: CryptoNewsItem[]): string => {
  return newsItemsToContent(
    items, 
    "Historical Cryptocurrency Milestones",
    "A look back at some of the most significant moments in cryptocurrency history:",
    true
  );
};
