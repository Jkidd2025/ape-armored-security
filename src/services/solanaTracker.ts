
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
  const { data, error } = await supabase.functions.invoke('get-solana-tracker-key');
  if (error) throw new Error('Failed to retrieve API key');
  return data;
}

export async function getTokenList(): Promise<TokenInfo[]> {
  try {
    const apiKey = await getApiKey();
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/token/list`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch token list');
    }
    const data = await response.json();
    return data.tokens;
  } catch (error) {
    console.error('Error fetching token list:', error);
    throw error;
  }
}

export async function getTokenPrice(mintAddress: string): Promise<TokenPrice> {
  try {
    const apiKey = await getApiKey();
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/token/${mintAddress}/price`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch token price');
    }
    const data = await response.json();
    return {
      price: data.price,
      volume24h: data.volume24h,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
}

export async function getTokenMetadata(mintAddress: string): Promise<TokenInfo> {
  try {
    const apiKey = await getApiKey();
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/token/${mintAddress}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch token metadata');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw error;
  }
}
