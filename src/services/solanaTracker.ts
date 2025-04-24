
import { supabase } from '@/integrations/supabase/client';

const SOLANA_TRACKER_BASE_URL = 'https://api.solanatracker.io/v1';

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
    const apiKey = await getApiKey();
    
    console.log('Fetching token list from:', SOLANA_TRACKER_BASE_URL);
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/tokens`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!response.ok) {
      console.error('API response error:', response.status, await response.text());
      throw new Error(`Failed to fetch token list: ${response.status}`);
    }
    
    const data = await response.json();
    return data.tokens || data || [];
  } catch (error) {
    console.error('Error fetching token list:', error);
    throw error;
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
      throw new Error(`Failed to fetch token price: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
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
      throw new Error(`Failed to fetch token metadata: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw error;
  }
}

