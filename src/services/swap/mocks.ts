
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

// Mock token prices in USD
const mockPrices: Record<string, number> = {
  'SOL': 155.42,
  'USDC': 1.00,
  'ETH': 3400.00,
  'BONK': 0.00001842,
  'USDT': 1.00,
  'RAY': 0.35,
  'JUP': 0.58,
  'PYTH': 0.76,
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
  
  // Get prices for tokens
  const fromPrice = mockPrices[fromToken] || 1;
  const toPrice = mockPrices[toToken] || 1;
  
  // Calculate exchange rate based on price ratio
  const exchangeRate = fromPrice / toPrice;
  
  // Calculate output amount based on exchange rate
  const inputAmount = parseFloat(amount);
  const outputAmount = inputAmount * exchangeRate;
  
  // Fee calculation (0.3% fee)
  const feeAmount = inputAmount * 0.003;
  
  // Calculate price impact (random between 0.01% and 0.1% for mock)
  const priceImpact = Math.random() * 0.0009 + 0.0001;
  
  // Convert to BigInt with 9 decimals of precision for consistent handling
  const inAmountBigInt = BigInt(Math.round(inputAmount * 1e9));
  const outAmountBigInt = BigInt(Math.round(outputAmount * 1e9));
  const feeBigInt = BigInt(Math.round(feeAmount * 1e9));
  
  console.log(`Swap quote: ${inputAmount} ${fromToken} (${fromPrice}) -> ${outputAmount.toFixed(6)} ${toToken} (${toPrice})`);
  
  return {
    inAmount: inAmountBigInt,
    outAmount: outAmountBigInt,
    fee: feeBigInt,
    priceImpact,
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
