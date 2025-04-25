
import { SwapQuote } from '@/types/swap';

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

export const getSwapQuote = async (
  fromToken: string,
  toToken: string,
  amount: string,
  slippage: number
): Promise<SwapQuote | null> => {
  try {
    console.log('Getting quote for swap', { fromToken, toToken, amount, slippage });
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      console.warn('Invalid amount for swap quote:', amount);
      return null;
    }
    
    // Get token prices for calculation
    const fromPrice = mockPrices[fromToken] || 1;
    const toPrice = mockPrices[toToken] || 1;
    
    // Calculate exchange rate based on price ratio
    const exchangeRate = fromPrice / toPrice;
    
    // Calculate output amount based on exchange rate
    const inputAmount = parseFloat(amount);
    const outputAmount = inputAmount * exchangeRate;
    
    // Fee calculation (0.3% fee is typical for most DEXes)
    const feeAmount = inputAmount * 0.003;
    
    // Calculate price impact (between 0.01% and 2% depending on liquidity)
    const priceImpact = 0.01; // 0.01% for large pools
    
    // Convert to BigInt with 9 decimals of precision
    const inAmountBigInt = BigInt(Math.round(inputAmount * 1e9));
    const outAmountBigInt = BigInt(Math.round(outputAmount * 1e9));
    const feeBigInt = BigInt(Math.round(feeAmount * 1e9));
    
    return {
      inAmount: inAmountBigInt,
      outAmount: outAmountBigInt,
      fee: feeBigInt,
      priceImpact,
      route: [fromToken, toToken]
    };
  } catch (error) {
    console.error('Error getting swap quote:', error);
    return null;
  }
};
