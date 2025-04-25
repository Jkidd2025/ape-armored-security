
import { Button } from "@/components/ui/button";
import WalletConnect from "./WalletConnect";
import { SwapState } from "@/types/swap";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SwapActionButtonProps {
  isConnected: boolean;
  swapState: SwapState;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwap: () => void;
  isValid: boolean;
  isLoadingPrice: boolean;
  walletAddress?: string | null;
}

export const SwapActionButton = ({
  isConnected,
  swapState,
  onConnect,
  onDisconnect,
  onSwap,
  isValid,
  isLoadingPrice,
  walletAddress,
}: SwapActionButtonProps) => {
  const [isAttemptingConnect, setIsAttemptingConnect] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      console.log("SwapActionButton: Initiating wallet connect");
      await onConnect();
    } catch (error) {
      console.error("Error in handleConnect:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log("SwapActionButton: Initiating wallet disconnect");
      await onDisconnect();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } catch (error) {
      console.error("Error in handleDisconnect:", error);
      toast({
        title: "Disconnect Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isConnected) {
    return <WalletConnect onConnect={handleConnect} />;
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
      
      <div className="flex flex-col items-center space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-sm border-apearmor-darkbronze hover:bg-apearmor-darkbronze/20"
          onClick={handleDisconnect}
        >
          Disconnect Wallet
        </Button>
        
        {walletAddress && (
          <span className="text-xs text-muted-foreground">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        )}
      </div>
    </div>
  );
};
