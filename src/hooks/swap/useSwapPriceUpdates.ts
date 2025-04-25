
import { useEffect, useCallback } from 'react';
import { TokenInfo } from "@/services/solanaTracker";
import { useTokenPrice } from '../useTokenPrice';

export const useSwapPriceUpdates = (
  fromToken: TokenInfo,
  toToken: TokenInfo,
  fromAmount: string,
  setToAmount: (amount: string) => void,
  isConnected: boolean,
  walletBalances: Record<string, number>
) => {
  const { isLoadingPrice, fetchPrice } = useTokenPrice();

  const updateToAmount = useCallback(async (value: string) => {
    if (!value || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      setToAmount("");
      return;
    }
    
    console.log(`Updating price for ${value} ${fromToken.symbol} to ${toToken.symbol}`);
    
    const priceResult = await fetchPrice(
      fromToken.symbol,
      toToken.symbol,
      value,
      0.5 // Default slippage
    );
    
    if (priceResult?.toAmount) {
      setToAmount(priceResult.toAmount);
    } else {
      setToAmount("");
    }
  }, [fromToken.symbol, toToken.symbol, fetchPrice, setToAmount]);

  // Update token prices when tokens change
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      updateToAmount(fromAmount);
    }
  }, [fromToken, toToken, fromAmount, updateToAmount]);

  const refreshPrice = useCallback(() => {
    console.log("Manual price refresh requested");
    if (fromAmount) {
      updateToAmount(fromAmount);
    } else {
      // If no amount is set, try with a default amount to show available exchange rate
      updateToAmount("1");
    }
  }, [fromAmount, updateToAmount]);

  return {
    isLoadingPrice,
    updateToAmount,
    refreshPrice,
  };
};
