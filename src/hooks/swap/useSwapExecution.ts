
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { SwapState } from "@/types/swap";
import { executeSwap } from '@/services/swap/swapExecutor';

export const useSwapExecution = (wallet: any, fetchWalletBalances: () => Promise<void>) => {
  const [swapState, setSwapState] = useState<SwapState>({
    loading: false,
    approving: false,
    swapping: false,
    error: null,
    txHash: null,
  });
  const { toast } = useToast();

  const handleSwap = async (
    fromToken: string,
    toToken: string,
    fromAmount: string,
    slippage: string,
    deadline: string
  ) => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }

    try {
      setSwapState({ ...swapState, swapping: true, error: null });

      toast({
        title: "Swap initiated",
        description: `Swapping ${fromAmount} ${fromToken} for ${toToken}`,
      });

      const result = await executeSwap(
        wallet,
        fromToken,
        toToken,
        fromAmount,
        parseFloat(slippage),
        parseInt(deadline)
      );

      if (result.success) {
        toast({
          title: "Swap successful",
          description: `Transaction hash: ${result.txHash}`,
        });
        setSwapState({
          ...swapState,
          swapping: false,
          txHash: result.txHash || null,
        });
        
        // Refresh balances after successful swap
        await fetchWalletBalances();
      } else {
        toast({
          title: "Swap failed",
          description: result.error || "Unknown error",
          variant: "destructive",
        });
        setSwapState({
          ...swapState,
          swapping: false,
          error: result.error || "Unknown error",
        });
      }
    } catch (error: any) {
      console.error("Swap error:", error);
      toast({
        title: "Swap error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      setSwapState({
        ...swapState,
        swapping: false,
        error: error.message || "An unknown error occurred",
      });
    }
  };

  return {
    swapState,
    handleSwap,
  };
};
