
import { useState } from 'react';
import { getSwapQuote } from '@/services/swapService';

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
        // Use proper token precision based on decimals (default to 6 if not available)
        const displayAmount = Number(quote.outAmount);
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
