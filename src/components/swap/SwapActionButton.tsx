
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { SwapState } from "@/types/swap";

interface SwapActionButtonProps {
  isConnected: boolean;
  swapState: SwapState;
  onConnect: () => void;
  onSwap: () => void;
  isValid: boolean;
  isLoadingPrice: boolean;
}

export const SwapActionButton = ({
  isConnected,
  swapState,
  onConnect,
  onSwap,
  isValid,
  isLoadingPrice,
}: SwapActionButtonProps) => {
  if (!isConnected) {
    return <WalletConnect onConnect={onConnect} />;
  }

  return (
    <Button 
      className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black font-semibold"
      disabled={!isValid || isLoadingPrice || swapState.swapping}
      onClick={onSwap}
    >
      {swapState.swapping ? "Swapping..." : "Swap"}
    </Button>
  );
};
