import { useState } from 'react';
import { getSwapQuote } from '@/services/swap/swapService';

export const useTokenPrice = () => {
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const fetchPrice = async (
    fromToken: string,
    toToken: string,
    amount: string,
    slippage: number
  ): Promise<{ toAmount: string } | null> => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return null;
    }
    
    setIsLoadingPrice(true);

    try {
      const quote = await getSwapQuote(
        fromToken,
        toToken,
        amount,
        slippage
      );

      if (quote) {
        // Convert BigInt to number for display, accounting for token decimals
        const displayAmount = Number(quote.outAmount) / 1e9;
        return { toAmount: displayAmount.toString() };
      }
    } catch (error) {
      console.error("Error fetching price:", error);
    } finally {
      setIsLoadingPrice(false);
    }
    
    return null;
  };

  return {
    isLoadingPrice,
    fetchPrice
  };
};
