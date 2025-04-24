
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { SwapState } from "@/types/swap";
import { useState } from "react";

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
  const [isAttemptingConnect, setIsAttemptingConnect] = useState(false);
  
  const handleConnect = async () => {
    setIsAttemptingConnect(true);
    try {
      await onConnect();
    } finally {
      setIsAttemptingConnect(false);
    }
  };

  if (!isConnected) {
    return (
      <WalletConnect 
        onConnect={handleConnect} 
      />
    );
  }

  let buttonText = "Swap";
  if (swapState.swapping) buttonText = "Swapping...";
  else if (!isValid) buttonText = "Enter amount";
  else if (isLoadingPrice) buttonText = "Loading price...";

  return (
    <Button 
      className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black font-semibold"
      disabled={!isValid || isLoadingPrice || swapState.swapping}
      onClick={onSwap}
    >
      {buttonText}
    </Button>
  );
};
