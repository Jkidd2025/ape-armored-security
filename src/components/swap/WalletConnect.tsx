
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { wallets } from "./mockData";

interface WalletConnectProps {
  onConnect: () => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [open, setOpen] = useState(false);

  const handleConnect = () => {
    // In a real app, this would handle the actual wallet connection
    onConnect();
    setOpen(false);
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
                onClick={handleConnect}
              >
                <img 
                  src={wallet.iconUrl} 
                  alt={wallet.name} 
                  className="w-6 h-6" 
                />
                <span>{wallet.name}</span>
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
