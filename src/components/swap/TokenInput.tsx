
import { Token } from "./mockData";
import { Button } from "@/components/ui/button";
import { TokenSelector } from "./TokenSelector";

interface TokenInputProps {
  label: "From" | "To";
  amount: string;
  onAmountChange?: (value: string) => void;
  selectedToken: Token;
  otherToken: Token;
  onSelectToken: (token: Token) => void;
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
  return (
    <div className="bg-background rounded-lg p-4 border border-apearmor-darkbronze">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">
          Balance: {isConnected ? `${selectedToken.balance} ${selectedToken.symbol}` : "0"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={isLoading ? "Loading..." : amount}
          onChange={(e) => onAmountChange?.(e.target.value)}
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
      {showMaxButton && (
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
