
import { useEffect } from 'react';
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

  const updateToAmount = async (value: string) => {
    if (!value || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      setToAmount("");
      return;
    }
    
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
  };

  // Update token prices when tokens change
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      updateToAmount(fromAmount);
    }
  }, [fromToken, toToken]);

  const refreshPrice = () => {
    if (fromAmount) {
      updateToAmount(fromAmount);
    }
  };

  return {
    isLoadingPrice,
    updateToAmount,
    refreshPrice,
  };
};
