
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
    
    // Production implementation needed:
    throw new Error('Production swap quote implementation required');
  } catch (error) {
    console.error('Error getting swap quote:', error);
    return null;
  }
};
