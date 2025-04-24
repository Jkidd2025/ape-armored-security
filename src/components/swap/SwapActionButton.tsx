
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { SwapState } from "@/types/swap";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SwapActionButtonProps {
  isConnected: boolean;
  swapState: SwapState;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwap: () => void;
  isValid: boolean;
  isLoadingPrice: boolean;
}

export const SwapActionButton = ({
  isConnected,
  swapState,
  onConnect,
  onDisconnect,
  onSwap,
  isValid,
  isLoadingPrice,
}: SwapActionButtonProps) => {
  const [isAttemptingConnect, setIsAttemptingConnect] = useState(false);
  
  const handleConnect = async () => {
    setIsAttemptingConnect(true);
    try {
      console.log("SwapActionButton: Initiating wallet connect");
      await onConnect();
    } catch (error) {
      console.error("Error in handleConnect:", error);
    } finally {
      setIsAttemptingConnect(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log("SwapActionButton: Initiating wallet disconnect");
      await onDisconnect();
    } catch (error) {
      console.error("Error in handleDisconnect:", error);
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
        {swapState.swapping && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {buttonText}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-sm border-apearmor-darkbronze hover:bg-apearmor-darkbronze/20"
        onClick={handleDisconnect}
      >
        Disconnect Wallet
      </Button>
    </div>
  );
};
