
import { SwapQuote, SwapResult } from '@/types/swap';

// Mock balance data
const mockBalances: Record<string, { amount: string; decimals: number }> = {
  'SOL': { amount: '10.5', decimals: 9 },
  'USDC': { amount: '250.75', decimals: 6 },
  'ETH': { amount: '1.25', decimals: 8 },
  'BONK': { amount: '1000000', decimals: 5 },
  'USDT': { amount: '145.50', decimals: 6 },
  'RAY': { amount: '75.25', decimals: 6 },
  'SRM': { amount: '200', decimals: 6 },
};

export const getMockTokenBalance = async (tokenSymbol: string): Promise<{ amount: string; decimals: number }> => {
  const balance = mockBalances[tokenSymbol.toUpperCase()] || { amount: '0', decimals: 9 };
  console.log(`Mock ${tokenSymbol} balance:`, balance);
  await new Promise(resolve => setTimeout(resolve, 100));
  return balance;
};

export const getMockSwapQuote = async (
  fromToken: string,
  toToken: string,
  amount: string,
  slippage: number
): Promise<SwapQuote> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    inAmount: BigInt(parseFloat(amount) * 1e9),
    outAmount: BigInt(parseFloat(amount) * 1.2 * 1e9),
    fee: BigInt(parseFloat(amount) * 0.003 * 1e9),
    priceImpact: 0.05,
    route: [fromToken, toToken]
  };
};

export const executeMockSwap = async (): Promise<SwapResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    txHash: `mock-tx-hash-${Date.now()}`,
  };
};
