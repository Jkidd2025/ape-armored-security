import { SwapQuote } from '@/types/swap';
import { getMockSwapQuote } from './mocks';
export { requestWalletPermissions } from './walletPermissions';
export { getTokenBalance } from './tokenBalances';
export { executeSwap } from './swapExecutor';
import { initConnection } from './solana';

let isMockImplementation = true;

try {
  // Try to import from @solana/web3.js
  require('@solana/web3.js');
  isMockImplementation = false;
  console.log('Using real Solana implementation');
} catch (error) {
  console.warn('Solana web3 library not available, using mock implementations:', error);
}

// Initialize connection when service is loaded
if (!isMockImplementation) {
  initConnection().catch(console.error);
}

export const getSwapQuote = async (
  fromToken: string,
  toToken: string,
  amount: string,
  slippage: number
): Promise<SwapQuote | null> => {
  try {
    console.log('Getting quote for swap', { fromToken, toToken, amount, slippage });
    
    // For future real implementation:
    // if (!isMockImplementation) {
    //   // Implement real DEX quote logic here
    // }
    
    // Currently using mock implementation for all cases
    return await getMockSwapQuote(fromToken, toToken, amount, slippage);
  } catch (error) {
    console.error('Error getting swap quote:', error);
    return null;
  }
};
