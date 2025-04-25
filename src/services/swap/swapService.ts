
import { SwapQuote } from '@/types/swap';
export { requestWalletPermissions } from './walletPermissions';
export { getTokenBalance } from './tokenBalances';
export { executeSwap } from './swapExecutor';
import { initConnection } from './solana';

// Initialize connection when service is loaded
initConnection().catch(console.error);

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
    
    // For production implementation using Jupiter Aggregator:
    const inputAmount = parseFloat(amount);
    
    // Calculate values for the quote - in prod this would come from Jupiter API
    // For now we're using a simple model until the real API is integrated
    
    // Get token prices (in production this would come from an oracle or the DEX API)
    const fromPrice = getTokenPrice(fromToken);
    const toPrice = getTokenPrice(toToken);
    
    // Calculate exchange rate based on price ratio
    const exchangeRate = fromPrice / toPrice;
    
    // Calculate output amount based on exchange rate
    const outputAmount = inputAmount * exchangeRate;
    
    // Fee calculation (0.3% fee is typical)
    const feeAmount = inputAmount * 0.003;
    
    // Price impact (would be calculated from liquidity in production)
    const priceImpact = 0.005; // 0.5%
    
    // Convert to BigInt with 9 decimals of precision for consistent handling
    const inAmountBigInt = BigInt(Math.round(inputAmount * 1e9));
    const outAmountBigInt = BigInt(Math.round(outputAmount * 1e9));
    const feeBigInt = BigInt(Math.round(feeAmount * 1e9));
    
    console.log(`Swap quote: ${inputAmount} ${fromToken} -> ${outputAmount.toFixed(6)} ${toToken}`);
    
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

// Helper function to get token price
// This would be replaced with a real price feed in production
function getTokenPrice(tokenSymbol: string): number {
  // Production token prices - this would be an API call
  // These are placeholder values until the real API integration is complete
  const prices: Record<string, number> = {
    'SOL': 155.42,
    'USDC': 1.00,
    'ETH': 3400.00,
    'BONK': 0.00001842,
    'USDT': 1.00,
    'RAY': 0.35,
    'JUP': 0.58,
    'PYTH': 0.76,
  };
  
  return prices[tokenSymbol.toUpperCase()] || 1.0;
}
