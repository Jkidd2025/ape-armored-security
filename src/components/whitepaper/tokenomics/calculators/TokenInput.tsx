
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

interface TokenInputProps {
  tokenAmount: string;
  setTokenAmount: (value: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ 
  tokenAmount, 
  setTokenAmount 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input and remove commas
    const value = e.target.value.replace(/,/g, '');
    if (value === '' || /^\d+$/.test(value)) {
      setTokenAmount(value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Calculator className="h-5 w-5 text-apearmor-teal" />
        <h4 className="text-lg font-medium">Calculate Token Value</h4>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="token-amount">Number of Tokens</Label>
        <Input
          id="token-amount"
          type="text"
          value={tokenAmount}
          onChange={handleChange}
          placeholder="Enter token amount"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TokenInput;
