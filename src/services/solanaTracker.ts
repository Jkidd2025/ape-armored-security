
import { supabase } from '@/integrations/supabase/client';
import { mockTokensWithBalance } from '@/components/swap/mockData';

// Updated API base URL 
const SOLANA_TRACKER_BASE_URL = 'https://api.solanatracker.io/api/v1';

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

async function getApiKey() {
  try {
    const { data, error } = await supabase.functions.invoke('get-solana-tracker-key');
    if (error) throw new Error('Failed to retrieve API key');
    return data;
  } catch (error) {
    console.error('Error getting API key:', error);
    throw error;
  }
}

export async function getTokenList(): Promise<TokenInfo[]> {
  try {
    const apiKey = await getApiKey();
    
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/tokens`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!response.ok) {
      console.error('API response error:', response.status, await response.text());
      // If API fails, return mock data
      return mockTokensWithBalance;
    }
    
    const data = await response.json();
    // Adjust parsing based on the actual API response structure
    const tokens = data.tokens || data || [];
    return tokens;
  } catch (error) {
    console.error('Error fetching token list:', error);
    // If there's any error, return mock data
    return mockTokensWithBalance;
  }
}

export async function getTokenPrice(mintAddress: string): Promise<TokenPrice> {
  try {
    const apiKey = await getApiKey();
    
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/tokens/${mintAddress}/price`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!response.ok) {
      console.error('API response error:', response.status, await response.text());
      // Return mock price data
      return {
        price: Math.random() * 100,
        volume24h: Math.random() * 1000000,
        timestamp: Date.now(),
      };
    }
    
    const data = await response.json();
    return {
      price: data.price,
      volume24h: data.volume24h,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('Error fetching token price:', error);
    // Return mock price data
    return {
      price: Math.random() * 100,
      volume24h: Math.random() * 1000000,
      timestamp: Date.now(),
    };
  }
}

export async function getTokenMetadata(mintAddress: string): Promise<TokenInfo> {
  try {
    const apiKey = await getApiKey();
    
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/tokens/${mintAddress}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!response.ok) {
      console.error('API response error:', response.status, await response.text());
      
      // Return matching mock token or a generic one if not found
      const mockToken = mockTokensWithBalance.find(t => t.mintAddress === mintAddress);
      if (mockToken) return mockToken;
      
      throw new Error(`Failed to fetch token metadata: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    
    // Return matching mock token or throw error if not found
    const mockToken = mockTokensWithBalance.find(t => t.mintAddress === mintAddress);
    if (mockToken) return mockToken;
    
    throw error;
  }
}
