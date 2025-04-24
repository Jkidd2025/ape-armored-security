
import { supabase } from '@/integrations/supabase/client';

// Define common Solana token data
export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  mintAddress: string;
  logoURI?: string;
  price?: number;
  volume24h?: number;
  balance?: number;
}

export interface TokenPrice {
  price: number;
  volume24h: number;
  timestamp: number;
}

// Improved fallback token list with more detailed information
const FALLBACK_TOKENS: TokenInfo[] = [
  {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    mintAddress: "So11111111111111111111111111111111111111112",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    price: 155.42,
    volume24h: 1250000000
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    price: 1.00,
    volume24h: 950000000
  },
  {
    symbol: "BONK",
    name: "Bonk",
    decimals: 5,
    mintAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    logoURI: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    price: 0.00001842,
    volume24h: 28000000
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    mintAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png",
    price: 1.00,
    volume24h: 850000000
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    decimals: 6,
    mintAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    logoURI: "https://raw.githubusercontent.com/sol-farm/token-logos/main/Jupiter.png",
    price: 0.58,
    volume24h: 120000000
  },
  {
    symbol: "RAY",
    name: "Raydium",
    decimals: 6,
    mintAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    price: 0.35,
    volume24h: 45000000
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    decimals: 6,
    mintAddress: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3/logo.png",
    price: 0.76,
    volume24h: 32000000
  }
];

// Map of mintAddresses to cached token prices - improves performance by reducing API calls
const tokenPriceCache: Record<string, TokenPrice & { expires: number }> = {};
const CACHE_DURATION = 60 * 1000; // 60 seconds

async function getApiKey() {
  try {
    const { data, error } = await supabase.functions.invoke('get-solana-tracker-key');
    if (error) {
      console.error('API key retrieval error:', error);
      throw new Error('Failed to retrieve API key');
    }
    return data;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw error;
  }
}

// Try different endpoint patterns (for resiliency)
const API_ENDPOINTS = [
  "https://api.solanatracker.io/api/v1",
  "https://api.solanatracker.io/v1", 
  "https://solanatracker.io/api/v1"
];

export async function getTokenList(): Promise<TokenInfo[]> {
  try {
    // Try to fetch from the API
    const apiKey = await getApiKey();
    
    // Try each endpoint until one works or all fail
    let response = null;
    let success = false;
    
    for (const baseUrl of API_ENDPOINTS) {
      try {
        console.log(`Fetching token list from: ${baseUrl}/tokens`);
        
        response = await fetch(`${baseUrl}/tokens`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        if (response.ok) {
          success = true;
          break;
        }
      } catch (endpointError) {
        console.warn(`Failed to fetch from ${baseUrl}:`, endpointError);
        // Continue to next endpoint
      }
    }
    
    if (success && response) {
      const data = await response.json();
      return data.tokens || data || [];
    } else {
      console.warn(`API response error: ${response?.status} ${await response?.text()}`);
      console.log('Using fallback token list');
      return FALLBACK_TOKENS;
    }
  } catch (error) {
    console.warn('Error fetching token list:', error);
    console.log('Using fallback token list due to API error');
    return FALLBACK_TOKENS;
  }
}

export async function getTokenPrice(mintAddress: string): Promise<TokenPrice> {
  // Check cache first
  const now = Date.now();
  if (tokenPriceCache[mintAddress] && tokenPriceCache[mintAddress].expires > now) {
    return {
      price: tokenPriceCache[mintAddress].price,
      volume24h: tokenPriceCache[mintAddress].volume24h,
      timestamp: tokenPriceCache[mintAddress].timestamp
    };
  }

  try {
    // Try to fetch from the API
    const apiKey = await getApiKey();
    
    // Try each endpoint until one works or all fail
    let response = null;
    let success = false;
    
    for (const baseUrl of API_ENDPOINTS) {
      try {
        response = await fetch(`${baseUrl}/tokens/${mintAddress}/price`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        if (response.ok) {
          success = true;
          break;
        }
      } catch (endpointError) {
        // Continue to next endpoint
      }
    }
    
    if (success && response) {
      const data = await response.json();
      
      // Cache the result
      tokenPriceCache[mintAddress] = {
        ...data,
        expires: now + CACHE_DURATION
      };
      
      return data;
    } else {
      // If API fails, get from fallback data
      const fallbackToken = FALLBACK_TOKENS.find(t => t.mintAddress === mintAddress);
      if (fallbackToken) {
        const fallbackData = {
          price: fallbackToken.price || 0,
          volume24h: fallbackToken.volume24h || 0,
          timestamp: now
        };
        
        // Cache the fallback result
        tokenPriceCache[mintAddress] = {
          ...fallbackData,
          expires: now + CACHE_DURATION
        };
        
        return fallbackData;
      }
      throw new Error(`Failed to fetch token price: ${response?.status}`);
    }
  } catch (error) {
    console.error('Error fetching token price:', error);
    
    // Return fallback price if available
    const fallbackToken = FALLBACK_TOKENS.find(t => t.mintAddress === mintAddress);
    if (fallbackToken) {
      return {
        price: fallbackToken.price || 0,
        volume24h: fallbackToken.volume24h || 0,
        timestamp: Date.now()
      };
    }
    
    // Default values if no fallback found
    return {
      price: 0,
      volume24h: 0,
      timestamp: Date.now()
    };
  }
}

export async function getTokenMetadata(mintAddress: string): Promise<TokenInfo> {
  try {
    const apiKey = await getApiKey();
    
    // Try each endpoint until one works or all fail
    let response = null;
    let success = false;
    
    for (const baseUrl of API_ENDPOINTS) {
      try {
        response = await fetch(`${baseUrl}/tokens/${mintAddress}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        if (response.ok) {
          success = true;
          break;
        }
      } catch (endpointError) {
        // Continue to next endpoint
      }
    }
    
    if (success && response) {
      return await response.json();
    } else {
      // If API fails, get from fallback data
      const fallbackToken = FALLBACK_TOKENS.find(t => t.mintAddress === mintAddress);
      if (fallbackToken) {
        return fallbackToken;
      }
      throw new Error(`Failed to fetch token metadata: ${response?.status}`);
    }
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    
    // Return fallback metadata if available
    const fallbackToken = FALLBACK_TOKENS.find(t => t.mintAddress === mintAddress);
    if (fallbackToken) {
      return fallbackToken;
    }
    
    // Return minimal information if no fallback found
    return {
      symbol: "UNKNOWN",
      name: "Unknown Token",
      decimals: 9,
      mintAddress: mintAddress
    };
  }
}
