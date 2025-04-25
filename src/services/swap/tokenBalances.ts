
import '../../utils/buffer-polyfill';

import { Connection, PublicKey } from '@solana/web3.js';
import { getConnection } from './solana';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const getTokenBalance = async (
  walletProvider: any,
  tokenSymbol: string
): Promise<{ amount: string; decimals: number }> => {
  try {
    if (!walletProvider || !walletProvider.isConnected) {
      console.warn("Cannot get token balance: wallet not connected");
      return { amount: '0', decimals: 9 };
    }
    
    if (!walletProvider.publicKey) {
      console.warn("Cannot get token balance: no public key available");
      return { amount: '0', decimals: 9 };
    }

    console.log(`Getting ${tokenSymbol} balance for wallet ${walletProvider.publicKey.toString()}`);
    
    // For demo purposes, return mock balances to make the UI functional
    // In production, this would query actual blockchain balances
    if (tokenSymbol === 'SOL') {
      // Simulate SOL balance
      return { amount: '2.5', decimals: 9 };
    }
    
    // Mock balances for other tokens
    const mockBalances: Record<string, string> = {
      'USDC': '150.75',
      'ETH': '0.12',
      'BONK': '540000',
      'USDT': '75.50',
      'RAY': '20.0',
      'JUP': '100.0',
      'PYTH': '50.0',
    };
    
    const balance = mockBalances[tokenSymbol] || '0';
    
    console.log(`${tokenSymbol} balance: ${balance}`);
    return { 
      amount: balance, 
      decimals: getDecimalsForToken(tokenSymbol) 
    };
      
  } catch (error) {
    console.error('Error getting token balance:', error);
    return { amount: '0', decimals: 9 };
  }
};

// Helper function to get token decimals
function getDecimalsForToken(symbol: string): number {
  const tokenDecimals: Record<string, number> = {
    'SOL': 9,
    'USDC': 6,
    'USDT': 6,
    'ETH': 8,
    'BONK': 5,
    'RAY': 6,
    'JUP': 6,
    'PYTH': 6
  };
  
  return tokenDecimals[symbol] || 9;
}
