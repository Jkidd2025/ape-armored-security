
import { useEffect, useCallback } from 'react';
import { TokenInfo } from "@/services/solanaTracker";
import { useTokenPrice } from '../useTokenPrice';
import { getSwapQuote } from '@/services/swap/quoteService';

export const useSwapPriceUpdates = (
  fromToken: TokenInfo,
  toToken: TokenInfo,
  fromAmount: string,
  setToAmount: (amount: string) => void,
  isConnected: boolean,
  walletBalances: Record<string, number>
) => {
  const { data: priceData, isLoading, refetch } = useTokenPrice();

  const updateToAmount = useCallback(async (value: string) => {
    if (!value || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      setToAmount("");
      return;
    }
    
    console.log(`Updating price for ${value} ${fromToken.symbol} to ${toToken.symbol}`);
    
    // Use the quoteService to get a swap price estimate
    try {
      const quote = await getSwapQuote(
        fromToken.symbol,
        toToken.symbol,
        value,
        0.5 // Default slippage
      );
      
      if (quote?.outAmount) {
        // Convert BigInt to a readable number string for display
        const outAmountValue = Number(quote.outAmount) / 1e9;
        setToAmount(outAmountValue.toString());
      } else {
        setToAmount("");
      }
    } catch (error) {
      console.error("Error updating token price:", error);
      setToAmount("");
    }
  }, [fromToken.symbol, toToken.symbol, setToAmount]);

  // Update token prices when tokens change
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      updateToAmount(fromAmount);
    }
  }, [fromToken, toToken, fromAmount, updateToAmount]);

  const refreshPrice = useCallback(() => {
    console.log("Manual price refresh requested");
    
    // Refresh the price data
    refetch();
    
    // Also update the conversion if we have an amount
    if (fromAmount) {
      updateToAmount(fromAmount);
    } else {
      // If no amount is set, try with a default amount to show available exchange rate
      updateToAmount("1");
    }
  }, [fromAmount, updateToAmount, refetch]);

  return {
    isLoadingPrice: isLoading,
    updateToAmount,
    refreshPrice,
  };
};
