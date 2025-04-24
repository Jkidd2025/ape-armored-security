
import { useState, useEffect } from "react";
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
  const [detectedWallets, setDetectedWallets] = useState<string[]>([]);
  const { toast } = useToast();

  // Check for installed wallet extensions when component mounts
  useEffect(() => {
    const checkForWallets = () => {
      const detected = [];
      if ((window as any).phantom?.solana) detected.push("Phantom");
      if ((window as any).solflare) detected.push("Solflare");
      
      setDetectedWallets(detected);
      console.log("Detected wallets:", detected);
    };
    
    checkForWallets();
    // Listen for wallet extension installations
    window.addEventListener("load", checkForWallets);
    
    return () => {
      window.removeEventListener("load", checkForWallets);
    };
  }, []);

  const handleConnect = async (walletName: string) => {
    setIsConnecting(true);
    
    try {
      console.log(`Attempting to connect to ${walletName}...`);
      
      // Get wallet provider
      let walletProvider;
      if (walletName === "Phantom" && (window as any).phantom?.solana) {
        walletProvider = (window as any).phantom.solana;
        
        // Request permissions from the wallet
        await walletProvider.connect({ onlyIfTrusted: false });
        
        // Make sure we have permission
        if (!walletProvider.isConnected) {
          throw new Error("Failed to connect to Phantom wallet");
        }
      } else if (walletName === "Solflare" && (window as any).solflare) {
        walletProvider = (window as any).solflare;
        
        // Request permissions from the wallet
        await walletProvider.connect();
        
        // Make sure we have permission
        if (!walletProvider.isConnected) {
          throw new Error("Failed to connect to Solflare wallet");
        }
      } else {
        throw new Error(`${walletName} extension not found. Please install it first.`);
      }
      
      // Verify public key is available
      const publicKey = walletProvider.publicKey?.toString();
      if (!publicKey) {
        throw new Error("Failed to retrieve wallet public key");
      }
      
      console.log("Connected wallet public key:", publicKey);
      
      toast({
        title: "Wallet connected",
        description: `Successfully connected to ${walletName} (${publicKey.slice(0, 4)}...${publicKey.slice(-4)})`,
      });
      
      // Call the parent's onConnect to update state
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

  const getWalletInstallUrl = (walletName: string) => {
    if (walletName === "Phantom") return "https://phantom.app/";
    if (walletName === "Solflare") return "https://solflare.com/";
    return "#";
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
            {wallets.map((wallet) => {
              const isDetected = detectedWallets.includes(wallet.name);
              
              return (
                <div key={wallet.id} className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 bg-muted border-apearmor-darkbronze hover:bg-apearmor-darkbronze/20"
                    onClick={() => handleConnect(wallet.name)}
                    disabled={isConnecting || !isDetected}
                  >
                    <img 
                      src={wallet.iconUrl} 
                      alt={wallet.name} 
                      className="w-6 h-6" 
                    />
                    <span>{wallet.name}</span>
                    {isConnecting && <span className="ml-auto animate-spin">⟳</span>}
                  </Button>
                  
                  {!isDetected && (
                    <a 
                      href={getWalletInstallUrl(wallet.name)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-apearmor-teal hover:underline"
                    >
                      Install
                    </a>
                  )}
                </div>
              );
            })}
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
