
const SOLANA_TRACKER_BASE_URL = 'https://api.solanatracker.io/v1';

export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  mintAddress: string;
  logoURI?: string;
  price?: number;
  volume24h?: number;
}

export interface TokenPrice {
  price: number;
  volume24h: number;
  timestamp: number;
}

export async function getTokenList(): Promise<TokenInfo[]> {
  try {
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/token/list`);
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
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/token/${mintAddress}/price`);
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
    const response = await fetch(`${SOLANA_TRACKER_BASE_URL}/token/${mintAddress}`);
    if (!response.ok) {
      throw new Error('Failed to fetch token metadata');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw error;
  }
}
