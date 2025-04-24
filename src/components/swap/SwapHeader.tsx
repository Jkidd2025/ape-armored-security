
import { RefreshCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwapHeaderProps {
  onRefresh: () => void;
  onSettingsClick: () => void;
  isLoadingPrice: boolean;
  fromAmount?: string;
}

export const SwapHeader = ({
  onRefresh,
  onSettingsClick,
  isLoadingPrice,
  fromAmount,
}: SwapHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium">Swap</h2>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="text-apearmor-teal hover:text-apearmor-teal/80"
          disabled={isLoadingPrice || !fromAmount}
        >
          <RefreshCcw size={18} className={isLoadingPrice ? "animate-spin" : ""} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="text-apearmor-teal hover:text-apearmor-teal/80"
        >
          <Settings size={18} />
        </Button>
      </div>
    </div>
  );
};
