
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { SwapState } from "@/types/swap";
import { useState } from "react";

interface SwapActionButtonProps {
  isConnected: boolean;
  swapState: SwapState;
  onConnect: () => void;
  onDisconnect: () => void; // Add disconnect handler
  onSwap: () => void;
  isValid: boolean;
  isLoadingPrice: boolean;
}

export const SwapActionButton = ({
  isConnected,
  swapState,
  onConnect,
  onDisconnect, // Add disconnect handler
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
    <div className="space-y-2">
      <Button 
        className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black font-semibold"
        disabled={!isValid || isLoadingPrice || swapState.swapping}
        onClick={onSwap}
      >
        {buttonText}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-sm border-apearmor-darkbronze hover:bg-apearmor-darkbronze/20"
        onClick={onDisconnect}
      >
        Disconnect Wallet
      </Button>
    </div>
  );
};
