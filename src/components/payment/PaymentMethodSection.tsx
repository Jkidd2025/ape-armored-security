
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, ExternalLink, Wallet } from "lucide-react";

interface PaymentMethodSectionProps {
  signatureHash: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethodSection = ({ signatureHash, onChange }: PaymentMethodSectionProps) => {
  return (
    <div className="border-t pt-4">
      <Label className="mb-2 block">Payment Method</Label>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2 rounded-md border p-3">
          <Coins className="mr-2 h-4 w-4" />
          <span>USDC Only</span>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="paymentAddress">Payment To Wallet Address</Label>
          <div className="relative">
            <Input 
              id="paymentAddress" 
              value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
              readOnly
              className="pl-10 bg-gray-50"
            />
            <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Send USDC to this wallet address to complete your payment</p>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="signatureHash">Signature Hash</Label>
          <Input 
            id="signatureHash" 
            placeholder="Enter transaction signature hash" 
            required
            value={signatureHash}
            onChange={onChange}
          />
          <p className="text-xs text-muted-foreground">
            Enter the signature hash of your transaction for verification - it can be found on Solscan - 
            <a 
              href="https://solscan.io/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-apearmor-teal hover:underline inline-flex items-center ml-1"
            >
              Solscan Check Here
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
