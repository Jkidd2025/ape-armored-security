
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { wallets } from "./mockData";
import { useToast } from "@/components/ui/use-toast";

interface WalletConnectProps {
  onConnect: () => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [open, setOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (walletName: string) => {
    setIsConnecting(true);
    
    try {
      // Check if wallet extension exists in window
      const phantomWallet = (window as any).phantom?.solana;
      const solflareWallet = (window as any).solflare;
      
      // Determine which wallet to connect to
      let wallet;
      if (walletName === "Phantom" && phantomWallet) {
        wallet = phantomWallet;
      } else if (walletName === "Solflare" && solflareWallet) {
        wallet = solflareWallet;
      } else {
        throw new Error(`${walletName} extension not found. Please install it first.`);
      }
      
      // Connect to wallet
      await wallet.connect();
      
      toast({
        title: "Wallet connected",
        description: `Successfully connected to ${walletName}`,
      });
      
      onConnect();
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Unable to connect to wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button 
        className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black font-semibold"
        onClick={() => setOpen(true)}
      >
        Connect Wallet
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-background border border-apearmor-darkbronze">
          <DialogHeader>
            <DialogTitle>Connect a wallet</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-2 pt-2">
            {wallets.map((wallet) => (
              <Button
                key={wallet.id}
                variant="outline"
                className="w-full justify-start gap-3 bg-muted border-apearmor-darkbronze hover:bg-apearmor-darkbronze/20"
                onClick={() => handleConnect(wallet.name)}
                disabled={isConnecting}
              >
                <img 
                  src={wallet.iconUrl} 
                  alt={wallet.name} 
                  className="w-6 h-6" 
                />
                <span>{wallet.name}</span>
                {isConnecting && <span className="ml-auto animate-spin">⟳</span>}
              </Button>
            ))}
          </div>
          
          <div className="text-center text-xs text-muted-foreground pt-2">
            By connecting a wallet, you agree to ApeArmor's Terms of Service and Privacy Policy
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
