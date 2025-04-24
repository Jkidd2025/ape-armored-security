
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

// Fallback token list to use when API is unavailable
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
  }
];

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

export async function getTokenList(): Promise<TokenInfo[]> {
  try {
    // Try to fetch from the API
    const apiKey = await getApiKey();
    
    console.log('Fetching token list from: https://api.solanatracker.io/api/v1/tokens');
    
    // Updated endpoint based on the repository structure
    const response = await fetch(`https://api.solanatracker.io/api/v1/tokens`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!response.ok) {
      console.warn(`API response error: ${response.status} ${await response.text()}`);
      console.log('Using fallback token list');
      return FALLBACK_TOKENS;
    }
    
    const data = await response.json();
    return data.tokens || data || [];
  } catch (error) {
    console.warn('Error fetching token list:', error);
    console.log('Using fallback token list due to API error');
    return FALLBACK_TOKENS;
  }
}

export async function getTokenPrice(mintAddress: string): Promise<TokenPrice> {
  try {
    // Try to fetch from the API
    const apiKey = await getApiKey();
    
    // Updated endpoint based on the repository structure
    const response = await fetch(`https://api.solanatracker.io/api/v1/tokens/${mintAddress}/price`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!response.ok) {
      // If API fails, get from fallback data
      const fallbackToken = FALLBACK_TOKENS.find(t => t.mintAddress === mintAddress);
      if (fallbackToken) {
        return {
          price: fallbackToken.price || 0,
          volume24h: fallbackToken.volume24h || 0,
          timestamp: Date.now()
        };
      }
      throw new Error(`Failed to fetch token price: ${response.status}`);
    }
    
    return await response.json();
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
    
    // Updated endpoint based on the repository structure
    const response = await fetch(`https://api.solanatracker.io/api/v1/tokens/${mintAddress}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!response.ok) {
      // If API fails, get from fallback data
      const fallbackToken = FALLBACK_TOKENS.find(t => t.mintAddress === mintAddress);
      if (fallbackToken) {
        return fallbackToken;
      }
      throw new Error(`Failed to fetch token metadata: ${response.status}`);
    }
    
    return await response.json();
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
