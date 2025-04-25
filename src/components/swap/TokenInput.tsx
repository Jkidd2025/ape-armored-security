
import { TokenInfo } from "@/services/solanaTracker";
import { Button } from "@/components/ui/button";
import { TokenSelector } from "./TokenSelector";

interface TokenInputProps {
  label: "From" | "To";
  amount: string;
  onAmountChange?: (value: string) => void;
  selectedToken: TokenInfo;
  otherToken: TokenInfo;
  onSelectToken: (token: TokenInfo) => void;
  isConnected: boolean;
  isLoading?: boolean;
  readOnly?: boolean;
  showMaxButton?: boolean;
  onMaxClick?: () => void;
  disabled?: boolean;
}

export const TokenInput = ({
  label,
  amount,
  onAmountChange,
  selectedToken,
  otherToken,
  onSelectToken,
  isConnected,
  isLoading,
  readOnly = false,
  showMaxButton = false,
  onMaxClick,
  disabled = false,
}: TokenInputProps) => {
  // Format balance for display
  const formatBalance = (balance?: number) => {
    if (balance === undefined) return "0";
    
    // For very small numbers, use scientific notation
    if (balance > 0 && balance < 0.001) {
      return balance.toExponential(2);
    }
    
    // For larger numbers, use fixed notation with up to 4 decimal places
    return balance.toLocaleString(undefined, {
      maximumFractionDigits: 4
    });
  };
  
  // Format display amount (for the input field)
  const formatDisplayAmount = (val: string) => {
    if (isLoading) return "Loading...";
    if (!val) return "";
    
    // For the "To" field with large numbers, format them nicely
    if (label === "To" && parseFloat(val) > 1000) {
      return parseFloat(val).toLocaleString(undefined, {
        maximumFractionDigits: 2
      });
    }
    
    return val;
  };

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onAmountChange || readOnly || disabled) return;
    
    const value = e.target.value;
    
    // Only allow numeric input with decimal point
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (value === "" || regex.test(value)) {
      onAmountChange(value);
    }
  };

  return (
    <div className="bg-background rounded-lg p-4 border border-apearmor-darkbronze">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">
          Balance: {isConnected ? `${formatBalance(selectedToken.balance)} ${selectedToken.symbol}` : "0"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={formatDisplayAmount(amount)}
          onChange={handleInputChange}
          placeholder="0.0"
          className="bg-transparent text-2xl outline-none w-full"
          readOnly={readOnly || disabled}
        />
        <TokenSelector 
          selectedToken={selectedToken}
          onSelectToken={onSelectToken}
          otherToken={otherToken}
        />
      </div>
      {showMaxButton && selectedToken?.balance && (
        <div className="flex justify-end mt-1">
          <Button 
            variant="ghost" 
            className="text-xs text-apearmor-teal"
            onClick={onMaxClick}
            disabled={!isConnected || disabled}
          >
            Max
          </Button>
        </div>
      )}
    </div>
  );
};
