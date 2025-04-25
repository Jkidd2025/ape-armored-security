
export const getTokenBalance = async (
  walletProvider: any,
  tokenSymbol: string
): Promise<{ amount: string; decimals: number }> => {
  try {
    if (!walletProvider || !walletProvider.isConnected) {
      console.warn("Cannot get token balance: wallet not connected");
      return { amount: '0', decimals: 9 };
    }
    
    console.log(`Getting ${tokenSymbol} balance for wallet`);
    
    // For development purposes, return mock balances
    // In production, this would use SPL token program to fetch actual balances
    const mockBalances: Record<string, { amount: string; decimals: number }> = {
      'SOL': { amount: '1.5', decimals: 9 },
      'USDC': { amount: '100', decimals: 6 },
      'ETH': { amount: '0.05', decimals: 8 },
      'BONK': { amount: '50000', decimals: 5 },
      'USDT': { amount: '75', decimals: 6 },
      'RAY': { amount: '25', decimals: 6 },
      'JUP': { amount: '150', decimals: 6 },
      'PYTH': { amount: '30', decimals: 6 }
    };
    
    // Get balance for the requested token, return 0 if not in our mock data
    const tokenBalance = mockBalances[tokenSymbol] || { amount: '0', decimals: 9 };
    console.log(`Mock balance for ${tokenSymbol}: ${tokenBalance.amount}`);
    
    return tokenBalance;
  } catch (error) {
    console.error('Error getting token balance:', error);
    return { amount: '0', decimals: 9 };
  }
};
